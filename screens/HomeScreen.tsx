import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Card, Surface, Text } from "react-native-paper";

import { useSession } from "../contexts/SessionContext";
import { AppParamList } from "../types";
import { AppService } from "../utils/services";

const LeftContent = (props: any) => (
  <Avatar.Icon {...props} icon="account-group" />
);

export default function HomeScreen({
  navigation,
}: {
  navigation: StackNavigationProp<AppParamList, "Home">;
}) {
  const {isLoggedIn} = useSession();
  const [orgs, setOrgs] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    if (isLoggedIn) AppService.getOrganizations().then(res => setOrgs(res));
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Surface style={styles.innerContainer}>
        <Text style={styles.title}>Your Organizations</Text>
        {typeof orgs === "object" && orgs.length ? (
          orgs.map(org => (
            <Card
              key={org._id}
              style={styles.card}
              onPress={() => {
                navigation.navigate("Organization", {
                  oid: org._id,
                  name: org.name,
                });
              }}
            >
              <Card.Title title={org.name} left={LeftContent} />
            </Card>
          ))
        ) : (
          <Text>You're not a part of any groups!</Text>
        )}
        <Button
          mode="contained"
          style={{ marginVertical: 16 }}
          onPress={() => {
            navigation.navigate("CreateOrganization");
          }}
        >
          Create an organization
        </Button>
      </Surface>
    </ScrollView>
  );
}

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
