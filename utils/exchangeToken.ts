import { setCodeVerifierHeader } from "../initializers/hackNextAuth";
import { useAuthRequest } from "expo-auth-session";
// import * as Crypto from "expo-crypto";
// import { getCsrfToken } from "next-auth/client";
import qs from "qs";
import { DeviceEventEmitter } from "react-native";
import * as Sentry from "sentry-expo";

export default async function exchangeToken(
  providerId: string,
  request: ReturnType<typeof useAuthRequest>[0],
  response: ReturnType<typeof useAuthRequest>[1]
) {
  setCodeVerifierHeader(request?.codeVerifier);
  // CSRF was inconsistently matching causing intermittent failures, can be ignored
  // https://github.com/nextauthjs/next-auth/issues/569#issuecomment-672968577
  // const csrf = await getCsrfToken();
  // const state = await Crypto.digestStringAsync(
  //   Crypto.CryptoDigestAlgorithm.SHA256,
  //   csrf
  // );
  // const params = { ...(response as any).params, state };
  const params = { ...(response as any).params };

  return await fetch(`/api/auth/callback/${providerId}?${qs.stringify(params)}`)
    .then(response => {
      if (response.url.includes("/error")) {
        throw new Error(`Authentication Failed: ${response.url}`);
      }
    })
    .catch(e => {
      // Using localhost, we will hit Network Request Failed for this request even when its
      // successful on android device/simulator and ios device, but not ios simulator
      // TODO: this will also hide legitimate failures locally, find a way to distinguish
      const isLocalhostIssue =
        process.env.API_DOMAIN!.includes("://10.94") &&
        e.message === "Network request failed";

      if (isLocalhostIssue) {
        console.log("Localhost Issue:", e);
        // fall through as though we succeeded
      } else {
        Sentry.Native.captureException(e);
        throw e;
      }
    })
    .finally(() => {
      setCodeVerifierHeader(undefined);
      DeviceEventEmitter.emit("focus");
    });
}
