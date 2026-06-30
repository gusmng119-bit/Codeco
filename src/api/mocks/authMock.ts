import MockAdapter from "axios-mock-adapter";
import axiosClient from "../core/axiosClient";
import appConfig from "../../config/appConfig";

if (appConfig.USE_LOCAL_FALLBACK) {
  const mock = new MockAdapter(axiosClient, { delayResponse: 800, onNoMatch: "passthrough" });

  mock.onPost("/auth/login").reply((config) => {
    try {
      const payload = JSON.parse(config.data || "{}");

      const isValid = appConfig.BYPASS_VALIDATION
        ? Boolean(payload.email && payload.password)
        : payload.email === appConfig.MOCK_USER_EMAIL && payload.password === appConfig.MOCK_USER_PASSWORD;

      if (isValid) {
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
