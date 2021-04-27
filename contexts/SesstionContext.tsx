import React from "react";

export interface SessionToken {
  user?: {
    name: string;
    email: string;
    image: string;
  };
  accessToken?: string;
  expires?: string;
}

const SessionContext = React.createContext<SessionToken | undefined>(undefined);

function SessionReducer(
  state: SessionToken | undefined,
  payload: SessionToken | undefined
) {
  // switch (payload.type) {
  //   case 'set': {
  //     return {Organization: payload.data}
  //   }
  //   default: {
  //     throw new Error(`Unhandled action type: ${payload.type}`)
  //   }
  // }
  const s = { ...state };

  for (const key in payload) {
    // @ts-ignore
    s[key] = payload[key];
  }

  return s;
}

function SessionProvider({ children }: { children: JSX.Element }) {
  // @ts-ignore
  const [state, dispatch] = React.useReducer(SessionReducer, null);
  return (
    // @ts-ignore
    <SessionContext.Provider value={[state, dispatch]}>
      {children}
    </SessionContext.Provider>
  );
}

function useSession() {
  // @ts-ignore
  const [state, setState] = React.useContext(SessionContext);
  if (state === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  // simple check to ensure session has been captured.
  if (!!!state) {
    getSession()
      .then((sess: SessionToken) => setState(sess))
      .catch(e => console.log(e));
  }

  return [state, setState];
}

const getSession = async () => {
  return fetch("/api/auth/session")
    .then(res => res.json())
    .then(res => res.result)
    .catch(e => {
      throw e;
    });
};

export { SessionProvider, useSession };
