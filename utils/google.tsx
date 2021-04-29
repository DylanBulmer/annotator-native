import { Button } from "react-native-paper";
import {
  Prompt,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
// import {useAuthRequest} from "expo-auth-session/providers/google"
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import exchangeToken from "./exchangeToken";
import { useSession, SessionToken } from "../contexts/SessionContext";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const useProxy = Constants.appOwnership === "expo";

function reverseDomain(domain: string) {
  return domain.split(".").reverse().join(".");
}

export default function GoogleLogIn() {
  // Linking.makeUrl("https://auth.expo.io/@dylanbulmer/annotator")
  const [session, setSession] = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const clientId =
    Constants.appOwnership === "expo"
      ? process.env.GOOGLE_CLIENT_ID!
      : Platform.select({
          ios: process.env.GOOGLE_IOS_CLIENT_ID!,
          android: process.env.GOOGLE_ANDROID_CLIENT_ID!,
          default: process.env.GOOGLE_CLIENT_ID!,
        });

  const discovery = useAutoDiscovery("https://accounts.google.com");

  const native = Platform.select({
    ios: `${reverseDomain(process.env.GOOGLE_IOS_CLIENT_ID!)}:/oauthredirect`,
    android: `com.bulmersolutions.annotator:/oauthredirect`,
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      // Client IDs.
      // expoClientId: process.env.GOOGLE_CLIENT_ID!,
      // iosClientId: process.env.GOOGLE_IOS_CLIENT_ID!,
      // androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID!,
      // webClientId: process.env.GOOGLE_CLIENT_ID!,
      clientId,

      // Create the redirect uri
      redirectUri: makeRedirectUri({
        native,
        useProxy,
      }),
      scopes: ["openid", "profile", "email"],

      // Ask for user select.
      prompt: Prompt.SelectAccount,
      usePKCE: false,
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      exchangeToken("google", request, response).then(async () => {
        await fetch(`/api/auth/session`)
          .then(res => res.json())
          .then((res: SessionToken) => {
            setLoading(false);
            if (res?.expires) {
              const expires = new Date(res.expires);
              const now = new Date();

              if (expires > now) {
                setSession(res)
                navigation.reset({
                  index: 1,
                  routes: [{ name: "App" }],
                });
              }
            }
          });
      });
    } else {
      setLoading(false);
    }
  }, [response]);

  return (
    <Button
      loading={loading}
      disabled={!request || loading}
      mode="contained"
      onPress={() => {
        promptAsync({ useProxy });
        setLoading(true);
      }}
    >
      {loading ? "Logging in..." : "Login with Google"}
    </Button>
  );
}
