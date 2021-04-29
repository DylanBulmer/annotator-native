import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateOrgScreen from "../screens/CreateOrgScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { AppParamList, RootStackParamList } from "../types";
import OrgScreen from "../screens/OrgScreen";
import ProjectScreen from "../screens/ProjectScreen";
import DatasetScreen from "../screens/DatasetScreen";
import { Avatar, Divider, Text } from "react-native-paper";
import { useSession } from "../contexts/SessionContext";
import BackendService from "../utils/backendService";

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

// const AppStack = createStackNavigator<AppParamList>();
const AppDrawer = createDrawerNavigator<AppParamList>();

interface DrawerProps extends DrawerContentComponentProps {
  rootNavigation: StackNavigationProp<RootStackParamList>;
}

function CustomDrawerContent(props: DrawerProps) {
  const { navigation, rootNavigation } = props;
  const [session, setSession] = useSession();

  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}

      <DrawerItem
        label={({ color }) => <Text style={{ color }}>Home</Text>}
        icon={({ color, size }) => (
          <Avatar.Icon color={color} size={size} icon={"home"} />
        )}
        onPress={() => navigation.navigate("Home")}
      />
      <Divider />
      <DrawerItem
        label={({ color }) => <Text style={{ color }}>Logout</Text>}
        icon={({ color, size }) => (
          <Avatar.Icon color={color} size={size} icon={"logout"} />
        )}
        onPress={() => {
          BackendService.logout(undefined)
            .then(() => {
              setSession(null);
            })
            .finally(() => {
              rootNavigation.reset({
                index: 1,
                routes: [{ name: "Login" }],
              });
            });
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function AppNavigator({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList>;
}) {
  return (
    <AppDrawer.Navigator
      drawerContent={props => (
        <CustomDrawerContent {...props} rootNavigation={navigation} />
      )}
    >
      <AppDrawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "Annotator" }}
      />
      <AppDrawer.Screen
        name="Create Organization"
        component={CreateOrgScreen}
        options={{ headerTitle: "Annotator" }}
      />
      <AppDrawer.Screen
        name="Organization"
        component={OrgScreen}
        options={{ headerTitle: "Organization" }}
      />
      <AppDrawer.Screen
        name="Projects"
        component={ProjectScreen}
        options={{ headerTitle: "Project" }}
      />
      <AppDrawer.Screen
        name="Datasets"
        component={DatasetScreen}
        options={{ headerTitle: "Dataset" }}
      />
    </AppDrawer.Navigator>
  );
}

// export default function RootNavigator() {
//   return (
//     <AppStack.Navigator>
//       <AppStack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ headerTitle: "Login to Annotator" }}
//       />
//       <AppStack.Screen
//         name="App"
//         component={AppNavigator}
//         options={({ route }) => ({
//           title: route.params?.name ? route.params.name : "Annotator",
//         })}
//       />
//     </AppStack.Navigator>
//   );
// }
