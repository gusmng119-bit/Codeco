import MockAdapter from "axios-mock-adapter";
import axiosClient from "../core/axiosClient";
import appConfig from "../../config/appConfig";

/* ======================================================
   MOCK USERS — setiap role punya akun sendiri
   Token di-encode sebagai btoa(JSON.stringify({email,role,name}))
   agar bisa di-decode tanpa library JWT
====================================================== */
const MOCK_USERS = [
  {
    email: "siswa@codeco.com",
    password: "password123",
    role: "siswa" as const,
    name: "Budiono Putrosono",
  },
  {
    email: "guru@codeco.com",
    password: "password123",
    role: "guru" as const,
    name: "Mr. Ilham",
  },
  {
    email: "admin@codeco.com",
    password: "password123",
    role: "admin" as const,
    name: "Ningsih Sari",
  },
];

const buildToken = (user: { email: string; role: string; name: string }) =>
  btoa(JSON.stringify({ email: user.email, role: user.role, name: user.name }));

if (appConfig.USE_LOCAL_FALLBACK) {
  const mock = new MockAdapter(axiosClient, { delayResponse: 800, onNoMatch: "passthrough" });

  mock.onPost("/auth/login").reply((config) => {
    try {
      const payload = JSON.parse(config.data || "{}");

      if (appConfig.BYPASS_VALIDATION) {
        // Mode bypass: terima email apapun, assign role dari env atau default "siswa"
        const role = appConfig.BYPASS_LOGIN_ROLE;
        const fakeUser = { email: payload.email || "user@codeco.com", role, name: "Demo User" };
        return [200, { token: buildToken(fakeUser), user: fakeUser }];
      }

      // Mode normal: cocokkan email + password dari MOCK_USERS
      const matched = MOCK_USERS.find(
        (u) => u.email === payload.email && u.password === payload.password
      );

      if (matched) {
        const userPayload = { email: matched.email, role: matched.role, name: matched.name };
        return [200, { token: buildToken(userPayload), user: userPayload }];
      }
    } catch {
      // fall through
    }

    return [401, { message: "Invalid email or password." }];
  });
}
