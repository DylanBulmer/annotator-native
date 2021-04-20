import "./initializers/addPlatformHeaders";
import "./initializers/hackNextAuth";

import { StatusBar } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { SessionProvider } from "./contexts/SesstionContext";
import { DarkTheme, Provider as PaperProvider } from "react-native-paper";
import { OrganizationProvider } from "./contexts/OrganizationContext";

const theme = {
  ...DarkTheme,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    // background: '#121212',
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SessionProvider>
        <OrganizationProvider>
          <PaperProvider theme={theme}>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </PaperProvider>
        </OrganizationProvider>
      </SessionProvider>
    );
  }
}
