import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

const URL = "http://annotator.test.bulmersolutions.com:8080";

const BackendService = {
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
    const body = props?.csrfToken
      ? {
          csrfToken: props.csrfToken,
        }
      : {};

    return new Promise<void>((resolve, reject) =>
      axios
        .post(`${URL}/api/auth/signout`, body, {
          headers: {
            "annotator-ownership": String(Constants.appOwnership),
            "annotator-platform": Platform.OS,
          },
        })
        .then(res => {
          if (props?.csrfToken) resolve();
          else {
            const csrfToken = /csrfToken.*?value="(?<value>.*?)"/gm.exec(
              res.data
            )?.groups?.value;
            if (csrfToken)
              BackendService.logout({ csrfToken })
                .then(() => resolve())
                .catch(() => reject());
            else reject();
          }
        })
        .catch(() => reject())
    );
  },
};

export default BackendService;
