import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateOrgScreen from "../screens/CreateOrgScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { AppParamList } from "../types";
import OrgScreen from "../screens/OrgScreen";

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AppStack = createStackNavigator<AppParamList>();

export default function AppNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: "Annotator" }}
      />
      <AppStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: "Annotator" }}
      />
      <AppStack.Screen
        name="CreateOrgScreen"
        component={CreateOrgScreen}
        options={{ headerTitle: "Annotator" }}
      />
      <AppStack.Screen
        name="OrgScreen"
        component={OrgScreen}
        options={{ headerTitle: "Annotator" }}
      />
    </AppStack.Navigator>
  );
}
