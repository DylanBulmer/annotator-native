import { Button } from "react-native-paper";
import {
  Prompt,
  makeRedirectUri,
} from "expo-auth-session";
import {useAuthRequest} from "expo-auth-session/providers/google"
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import exchangeToken from "./exchangeToken";
import { useSession, SessionToken } from "../contexts/SesstionContext";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession()

const useProxy = Constants.appOwnership === "expo";

export default function GoogleLogIn() {
  // Linking.makeUrl("https://auth.expo.io/@dylanbulmer/annotator")
  const [session, setSession] = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const [request, response, promptAsync] = useAuthRequest(
    {
      // Client IDs.
      expoClientId: process.env.GOOGLE_CLIENT_ID!,
      iosClientId: process.env.GOOGLE_IOS_CLIENT_ID!,
      androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID!,
      webClientId: process.env.GOOGLE_CLIENT_ID!,

      // Create the redirect uri
      redirectUri: makeRedirectUri({
        // native: "exp://10.94.166.126:19005/--/expo-auth-session",
        useProxy,
      }),
      scopes: ["openid", "profile", "email"],

      // Ask for user select.
      prompt: Prompt.SelectAccount,
    },
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log(authentication)
      exchangeToken("google", request, response).then(async () => {
        await fetch(`/api/auth/session`)
          .then(res => res.json())
          .then((res: SessionToken) => {
            setLoading(false);
            if (res?.expires) {
              const expires = new Date(res.expires);
              const now = new Date();
              
              expires > now && setSession(res);
            } 
          });
      });
    }
  }, [response]);

  useEffect(() => {
    if (session?.user) {
      navigation.reset({
        index: 1,
        routes: [{name: "HomeScreen"}]
      })
    }
  }, [session])

  return (
    <Button
      icon={loading? "sync" : undefined}
      disabled={!request || loading}
      onPress={() => {
        promptAsync();
        setLoading(true);
      }}
    >
      {loading ? "Logging in..." : "Login with Google"}
    </Button>
  );
}
