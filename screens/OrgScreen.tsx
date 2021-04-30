import { Route } from "@react-navigation/routers";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Surface, Card, Avatar } from "react-native-paper";
import { useOrganization } from "../contexts/OrganizationContext";
import { useSession } from "../contexts/SessionContext";
import { AppParamList, Project } from "../types";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

export default function OrgScreen({
  route,
  navigation,
}: {
  route: Route<string, { oid: string }>;
  navigation: StackNavigationProp<AppParamList, "Organization">;
}) {
  const { session } = useSession();
  const { oid } = route.params;
  const [org] = useOrganization({ oid });

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects(org?._id || oid).then((res: Project[]) => {
      const mProjects = res.filter(
        p =>
          p.datasets.filter(d => session?.user ? d.user.includes(session.user.email) : false).length > 0
      );
      setProjects(mProjects);
    });
  }, [org?._id]);

  return (
    <Surface style={styles.innerContainer}>
      <Text style={styles.title}>Your Projects:</Text>
      {projects.length ? (
        projects.map(p => (
          <Card
            style={styles.project}
            key={`project-${p._id}`}
            onPress={() => {
              navigation.navigate("Projects", {
                project: p,
                name: p.name,
              });
            }}
          >
            <Card.Title
              title={p.name}
              left={LeftContent}
              subtitle={`Organized by: ${p.organizer.name}`}
            />
          </Card>
        ))
      ) : (
        <Text>No projects found.</Text>
      )}
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
