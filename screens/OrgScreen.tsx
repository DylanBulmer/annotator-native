import { Route } from "@react-navigation/routers";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Text,
  Surface,
  Card,
  Title,
  Paragraph,
  Avatar,
} from "react-native-paper";
import { useOrganization } from "../contexts/OrganizationContext";
import { useSession } from "../contexts/SesstionContext";
import { AppParamList } from "../types";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

export default function OrgScreen({
  route,
  navigation,
}: {
  route: Route<string, { oid: string }>;
  navigation: StackNavigationProp<AppParamList, "OrgScreen">;
}) {
  const [session] = useSession();
  const { oid } = route.params;
  const [org] = useOrganization({ oid });

  return (
    <Surface style={styles.innerContainer}>
      <Text style={styles.title}>Welcome, {org.name}</Text>
      {[1, 2, 3, 4, 5].map(p => (
        <Card style={styles.project} key={`project-${p}`}>
          <Card.Title
            title="Project Name"
            subtitle="Organizer: Dylan Bulmer"
            left={LeftContent}
          />
        </Card>
      ))}
    </Surface>
  );
}

const styles = StyleSheet.create({
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
  project: {
    marginVertical: 8,
  },
});
