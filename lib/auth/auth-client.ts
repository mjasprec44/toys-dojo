import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "facebook",
    // idToken: {
    //   ...(platform === "ios"
    //     ? { token: idToken }
    //     : { token: accessToken, accessToken: accessToken }),
    // },
  });
};
