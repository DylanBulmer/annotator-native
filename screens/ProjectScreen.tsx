import { Route } from "@react-navigation/routers";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Surface, Card, Avatar } from "react-native-paper";
import { useOrganization } from "../contexts/OrganizationContext";
import { useSession } from "../contexts/SesstionContext";
import { AppParamList } from "../types";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="database" />;

export default function ProjectScreen({
  route,
  navigation,
}: {
  route: Route<
    string,
    {
      project: {
        _id: string;
        createdAt: string;
        name: string;
        datasets: [
          {
            _id: string;
            name: string;
            label: string;
            user: string | string[];
          }
        ];
        organization: string;
        organizer: {
          _id: string;
          email: string;
          name: string;
        };
        updatedAt: string;
      };
    }
  >;
  navigation: StackNavigationProp<AppParamList, "ProjectScreen">;
}) {
  const [session] = useSession();
  const { project } = route.params;

  const availableDatasets: {
    _id: string;
    name: string;
    label: string;
    user: string | string[];
  }[] = project?.datasets.filter(d => d.user.includes(session?.user?.email));

  return (
    <Surface style={styles.innerContainer}>
      <Text style={styles.title}>{project?.name}</Text>
      {availableDatasets.length ? (
        availableDatasets.map(d => (
          // only allow datasets assigned to current user.
          <Card
            style={styles.project}
            key={`dataset-${d._id}`}
            onPress={() =>
              navigation.navigate("DatasetScreen", {
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