import { DeviceEventEmitter } from "react-native";

// next-auth uses addEventListener, define that so focus/blur trigger next auth listeners
// @ts-ignore
window.addEventListener = (...args) => DeviceEventEmitter.addListener(...args);

let codeVerifier: string | undefined = undefined;

export function setCodeVerifierHeader(verifier: string | undefined) {
  codeVerifier = verifier;
}

console.log(`Using api at: ${process.env.API_DOMAIN}`);
let originalFetch = fetch;

// @ts-ignore
fetch = (url: string, options: { headers: HeadersInit } = { headers: {} }) => {
  // turn relative urls into absolute urls on the API path
  const modifiedUrl =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `${process.env.API_DOMAIN}/${url.startsWith("/") ? url.slice(1) : url}`;

  if (codeVerifier) {
    options.headers = {
      ...options.headers,
      "annotator-verifier": codeVerifier,
    };
  }

  return originalFetch(modifiedUrl, options);
};
