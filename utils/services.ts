import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

const URL = "http://annotator.test.bulmersolutions.com:8080";

export const AuthService = {
  getSession: () =>
    axios.get(`${URL}/api/auth/session`, {
      headers: {
        "annotator-ownership": String(Constants.appOwnership),
        "annotator-platform": Platform.OS,
      },
    }),
  getCallback: (props: {
    codeVerifier: string | undefined;
    providerId: string;
    params: string;
  }) =>
    axios.get(`${URL}/api/auth/callback/${props.providerId}?${props.params}`, {
      headers: {
        "annotator-ownership": String(Constants.appOwnership),
        "annotator-platform": Platform.OS,
        "annotator-verifier": props.codeVerifier,
      },
    }),
  logout: (
    props:
      | {
          csrfToken: string | undefined;
        }
      | undefined
  ) => {
    // Generate POST body.
    const body = props?.csrfToken
      ? {
          csrfToken: props.csrfToken,
        }
      : {};

    // Return a void promise.
    return new Promise<void>((resolve, reject) => {
      // Start axios POST request.
      axios
        .post(`${URL}/api/auth/signout`, body, {
          headers: {
            "annotator-ownership": String(Constants.appOwnership),
            "annotator-platform": Platform.OS,
          },
        })
        .then(res => {
          // If token is provided, resolve promise.
          if (props?.csrfToken) resolve();
          // Else, scrape the response page for the token.
          else {
            // Preform regex and store the value of token
            const csrfToken = /csrfToken.*?value="(?<value>.*?)"/gm.exec(
              res.data
            )?.groups?.value;
            // if token exists, call logout again, but send token
            if (csrfToken)
              AuthService.logout({ csrfToken })
                .then(() => resolve())
                .catch(() => reject());
            // else reject.
            else reject();
          }
        })
        .catch(() => reject());
    });
  },
};
