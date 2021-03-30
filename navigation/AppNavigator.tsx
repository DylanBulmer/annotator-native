import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { AppParamList } from "../types";

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
    </AppStack.Navigator>
  );
}
