import MockAdapter from "axios-mock-adapter";
import axiosClient from "../core/axiosClient";
import appConfig from "../../config/appConfig";

if (appConfig.USE_LOCAL_FALLBACK) {
  const mock = new MockAdapter(axiosClient, { delayResponse: 800, onNoMatch: "passthrough" });

  mock.onPost("/auth/login").reply((config) => {
    try {
      const payload = JSON.parse(config.data || "{}");

      if (payload.email && payload.password) {
        return [
          200,
          {
            token: "dummy-jwt-token",
            user: {
              email: payload.email,
            },
          },
        ];
      }
    } catch {
      // fall through to invalid credentials
    }

    return [401, { message: "Invalid email or password." }];
  });
}
