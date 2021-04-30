import { Route } from "@react-navigation/routers";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Surface, Card, Avatar } from "react-native-paper";
import { useSession } from "../contexts/SessionContext";
import { AppParamList, Project } from "../types";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="database" />;

export default function ProjectScreen({
  route,
  navigation,
}: {
  route: Route<string, { project: Project }>;
  navigation: StackNavigationProp<AppParamList, "Projects">;
}) {
  const { session } = useSession();
  const { project } = route.params;

  const availableDatasets: {
    _id: string;
    name: string;
    label: string;
    user: string | string[];
  }[] = project?.datasets.filter(d => session?.user ? d.user.includes(session.user.email) : false);

  return (
    <Surface style={styles.innerContainer}>
      <Text style={styles.title}>Your Datasets:</Text>
      {availableDatasets.length ? (
        availableDatasets.map(d => (
          // only allow datasets assigned to current user.
          <Card
            style={styles.project}
            key={`dataset-${d._id}`}
            onPress={() =>
              navigation.navigate("Datasets", {
                name: d.name,
                project,
                dataset: d,
              })
            }
          >
            <Card.Title
              title={d.name}
              left={LeftContent}
              subtitle={typeof d.user === "object" ? d.user.join(", ") : d.user}
            />
          </Card>
        ))
      ) : (
        <Text>There are no datasets for this project.</Text>
      )}
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
