import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { AppParamList } from "../types";

export default function LoginScreen({
  navigation,
}: {
  navigation: StackNavigationProp<AppParamList, "LoginScreen">;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Button
        onPress={() => {
          navigation.reset({
            index: 1,
            routes: [{name: "HomeScreen"}]
          })
        }}
      >
        Login
      </Button>
    </View>
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
