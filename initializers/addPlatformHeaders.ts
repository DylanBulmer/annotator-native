import Constants from "expo-constants";
import { Platform } from "react-native";

const originalFetch = fetch;
// eslint-disable-next-line no-global-assign
// @ts-ignore
fetch = (
  url: string,
  options: { headers: HeadersInit } = { headers: {} }
) => {
  return originalFetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "annotator-ownership": String(Constants.appOwnership),
      "annotator-platform": Platform.OS,
    },
  });
};