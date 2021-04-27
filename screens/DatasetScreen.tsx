import { Route } from "@react-navigation/routers";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, Surface, DataTable, Button } from "react-native-paper";
import { useSession } from "../contexts/SesstionContext";
import { AppParamList } from "../types";

export default function DatasetScreen({
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
        organization: string;
        organizer: {
          _id: string;
          email: string;
          name: string;
        };
        updatedAt: string;
      };
      dataset: {
        _id: string;
        name: string;
        label: string;
        user: string | string[];
      };
    }
  >;
  navigation: StackNavigationProp<AppParamList, "DatasetScreen">;
}) {
  const [session] = useSession();
  const { project, dataset } = route.params;

  const [annotations, setAnnotations] = useState<
    {
      _id: string;
      dataId: string;
      type: string;
    }[]
  >([]);

  const [pagination, setPagination] = useState<{
    page: number;
    size: number;
  }>({
    page: 0,
    size: 5,
  });

  useEffect(() => {
    getAnnotations(
      project.organization,
      project._id,
      dataset._id,
      pagination.page,
      pagination.size
    ).then(res => setAnnotations(res));
  }, [dataset._id]);

  return (
    <Surface style={styles.innerContainer}>
      {/* <Text style={styles.title}>{dataset.name}</Text> */}
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Annotation ID</DataTable.Title>
            <DataTable.Title>Type</DataTable.Title>
            <DataTable.Title numeric>
              Action
            </DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {annotations.map(a => {
              return (
                <DataTable.Row key={`annotation-${a._id}`}>
                  <DataTable.Cell style={{ maxWidth: 150, paddingRight: 16}}>
                    <Text ellipsizeMode='middle' numberOfLines={1}>
                      {a.dataId}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{a.type}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Button>Annotate</Button>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </ScrollView>

          <DataTable.Pagination
            page={pagination.page}
            numberOfPages={3}
            onPageChange={page => {
              setPagination(p => ({ ...p, page }));
            }}
            label={`${pagination.page * pagination.size + 1}-${
              pagination.page * pagination.size + pagination.size
            } of ?"`}
          />
        </DataTable>
      </ScrollView>
    </Surface>
  );
}

const getAnnotations = (
  oid: string,
  pid: string,
  did: string,
  page: number,
  size: number
) => {
  return fetch(
    `/api/v1/organization/${oid}/project/${pid}/${did}?page=${page}&limit=${size}`
  )
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