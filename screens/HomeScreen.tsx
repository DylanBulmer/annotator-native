import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Card, Surface, Text } from "react-native-paper";

import { View } from "../components/Themed";
import { useSession } from "../contexts/SesstionContext";
import { AppParamList } from "../types";

export default function HomeScreen({
  navigation,
}: {
  navigation: StackNavigationProp<AppParamList, "LoginScreen">;
}) {
  const [session] = useSession();
  const [orgs, setOrgs] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    getOrganizations().then(res => setOrgs(res));
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Surface style={styles.innerContainer}>
        <Text style={styles.title}>Home</Text>
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
        <Text>Choose or create an organization to continue.</Text>
        {
          // @ts-ignore
          orgs.map(org => (
            <Card
              key={org._id}
              style={styles.card}
              onPress={() => {
                navigation.navigate("OrgScreen", {
                  oid: org._id
                });
              }}
            >
              <Text style={styles.cardText}>{org.name}</Text>
            </Card>
          ))
        }
        <Button
          onPress={() => {
            navigation.push("CreateOrgScreen");
          }}
        >
          Create an organization
        </Button>
      </Surface>
    </ScrollView>
  );
}

const getOrganizations = () => {
  return fetch("/api/v1/organization")
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
    alignItems: "center",
    paddingVertical: 32,
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
  card: {
    width: "90%",
    marginVertical: 5,
    marginHorizontal: "5%",
    minHeight: 48,
  },
  cardText: {
    lineHeight: 48,
    textAlign: "center",
  },
});
