import { Route } from "@react-navigation/routers";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Surface, Card, Avatar } from "react-native-paper";
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

  const [projects, setProjects] = useState<
    {
      _id: string;
      name: string;
      organizer: {
        name: string;
      };
    }[]
  >([]);

  useEffect(() => {
    getProjects(org?._id || oid).then(res => setProjects(res));
  }, [org?._id]);

  return (
    <Surface style={styles.innerContainer}>
      <Text style={styles.title}>Welcome, {org?.name}</Text>
      {projects.map(p => (
        <Card
          style={styles.project}
          key={`project-${p._id}`}
          onPress={() => {
            navigation.navigate("ProjectScreen", {
              project: p,
            });
          }}
        >
          <Card.Title
            title={p.name}
            left={LeftContent}
            subtitle={`Organized by: ${p.organizer.name}`}
          />
        </Card>
      ))}
    </Surface>
  );
}

const getProjects = (oid: string) => {
  return fetch(`/api/v1/organization/${oid}/project`)
    .then(res => res.json())
    .then(res => res.result);
};

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
