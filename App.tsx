import "./initializers/addPlatformHeaders";
import "./initializers/hackNextAuth";

import { StatusBar } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { SessionProvider } from "./contexts/SessionContext";
import { Provider as PaperProvider } from "react-native-paper";
import { OrganizationProvider } from "./contexts/OrganizationContext";
import { DarkTheme, LightTheme } from "./utils/theme";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SessionProvider>
        <OrganizationProvider>
          <PaperProvider
            theme={
              colorScheme === "light"
                ? LightTheme.paper
                : DarkTheme.paper
            }
          >
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
