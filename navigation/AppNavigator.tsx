import { StackNavigationProp } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import CreateOrgScreen from "../screens/CreateOrgScreen";
import { AppParamList, RootStackParamList } from "../types";
import OrgScreen from "../screens/OrgScreen";
import ProjectScreen from "../screens/ProjectScreen";
import DatasetScreen from "../screens/DatasetScreen";
import { Avatar, Divider, Text, Title } from "react-native-paper";
import { useSession } from "../contexts/SessionContext";
import { AuthService } from "../utils/services";

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

// const AppStack = createStackNavigator<AppParamList>();
const AppDrawer = createDrawerNavigator<AppParamList>();

interface DrawerProps extends DrawerContentComponentProps {
  rootNavigation: StackNavigationProp<RootStackParamList>;
}

function CustomDrawerContent(props: DrawerProps) {
  const { navigation, rootNavigation } = props;
  const { session, setSession, isLoggedIn } = useSession();

  // React.useEffect(() => {
  //   if (!isLoggedIn) {
  //   }
  // }, [session]);

  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <Title style={{ alignSelf: "center", paddingVertical: 16 }}>
        Annotator GO!
      </Title>
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
          AuthService.logout(undefined).then(() => {
            setSession({});

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
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitle: route?.params?.name,
      })}
    >
      <AppDrawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "Annotator" }}
      />
      <AppDrawer.Screen
        name="CreateOrganization"
        component={CreateOrgScreen}
        options={{ headerTitle: "Annotator" }}
      />
      <AppDrawer.Screen name="Organization" component={OrgScreen} />
      <AppDrawer.Screen name="Projects" component={ProjectScreen} />
      <AppDrawer.Screen name="Datasets" component={DatasetScreen} />
    </AppDrawer.Navigator>
  );
}
