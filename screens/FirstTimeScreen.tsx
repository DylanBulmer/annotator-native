import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, TextInput, Surface } from "react-native-paper";
import { View } from "../components/Themed";
import { useSession } from "../contexts/SesstionContext";
import { AppParamList } from "../types";

export default function CreateOrgScreen({
  navigation,
}: {
  navigation: StackNavigationProp<AppParamList, "CreateOrgScreen">;
}) {
  const [session] = useSession();
  const [text, setText] = React.useState("");

  return (
    <Surface style={styles.innerContainer}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.2)"
      />
      <Text>Hello, {session.user.name}!</Text>
      <Text>Welcome to PERC_Lab's Annotator tool!</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.2)"
      />
      <Button
        disabled={!text}
        mode="contained"
        style={{ width: 100, alignSelf: "flex-end" }}
        onPress={() => {
          postOrganization(text).then(() => {
            navigation.pop();
          });
        }}
      >
        Create
      </Button>
    </Surface>
  );
}

const postOrganization = (name: string) => {
  return fetch("/api/v1/organization", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  })
    .then(res => res.json())
    .then(res => res.result);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    marginVertical: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
