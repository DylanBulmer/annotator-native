import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Card, Surface, Text } from "react-native-paper";

import { View } from "../components/Themed";
import { useSession } from "../contexts/SesstionContext";
import { AppParamList } from "../types";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="account-group" />;

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
        <Text style={styles.title}>Your Organizations</Text>
        {
          // @ts-ignore
          orgs.map(org => (
            <Card
              key={org._id}
              style={styles.card}
              onPress={() => {
                navigation.navigate("OrgScreen", {
                  oid: org._id,
                });
              }}
            >
              <Card.Title title={org.name} left={LeftContent} />
            </Card>
          ))
        }
        <Button
          mode="contained"
          style={{marginVertical: 16}}
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
