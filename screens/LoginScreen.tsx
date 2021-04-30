import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Divider, Surface, Text, Title } from "react-native-paper";
import { useSession } from "../contexts/SessionContext";

import { RootStackParamList } from "../types";
import GoogleLogIn from "../utils/google";
import { AuthService } from "../utils/services";

export default function LoginScreen({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
}) {
  const { setSession } = useSession();

  React.useEffect(() => {
    AuthService.getSession().then(res => {
      if (res && res?.user) {
        setSession(res);
        navigation.reset({
          index: 1,
          routes: [{ name: "App" }],
        });
      }
    });
  }, []);

  return (
    <Surface style={styles.container}>
      <Title>Annotator GO</Title>
      <Text style={styles.text}>
        Welcome to PERC_Lab's open-sourced annotator tool!
      </Text>
      <Divider style={styles.separator} />
      <GoogleLogIn />
      <Divider style={styles.separator} />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 32,
  },
  text: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 60,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
  },
});
