import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
} from "react-native-paper";
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
} from "@react-navigation/native";

export const DarkTheme = {
  paper: {
    ...PaperDarkTheme,
    roundness: 2,
    colors: {
      ...PaperDarkTheme.colors,
      background: "#121212",
      primary: "#3498db",
      accent: "#f1c40f",
    },
    dark: true,
  },
  navigation: {
    ...NavDarkTheme,
  }
};

export const LightTheme = {
  paper: {
    ...PaperLightTheme,
    roundness: 2,
    colors: {
      ...PaperLightTheme.colors,
      primary: "#3498db",
      accent: "#f1c40f",
    },
  },
  navigation: {
    ...NavLightTheme,
  }
};

export default { 
  Light: LightTheme,
  Dark: DarkTheme
}
