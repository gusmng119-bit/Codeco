import MockAdapter from "axios-mock-adapter";
import axiosClient from "../core/axiosClient";

const mock = new MockAdapter(axiosClient, { delayResponse: 800 });

const DEMO_EMAIL = "gusmng119@gmail.com";
const DEMO_PASSWORD = "admin123";

mock.onPost("/auth/login").reply((config) => {
  try {
    const payload = JSON.parse(config.data || "{}");

    if (
      payload.email === DEMO_EMAIL &&
      payload.password === DEMO_PASSWORD
    ) {
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

export default mock;
