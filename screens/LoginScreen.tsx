import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";
import { View } from "../components/Themed";

import { RootStackParamList } from "../types";
import GoogleLogIn from "../utils/google";

export default function LoginScreen({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
}) {
  return (
    <Surface style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <GoogleLogIn />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
