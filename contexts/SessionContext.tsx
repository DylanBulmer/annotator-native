import React from "react";
import { AuthService } from "../utils/services";
import { isEqual } from "lodash";

export interface ISessionToken {
  user?: {
    name: string;
    email: string;
    image: string;
  };
  accessToken?: string;
  expires?: string;
}

type SessionContextType = {
  session?: ISessionToken;
  setSession: (session: ISessionToken) => void;
  isLoggedIn: boolean;
};

function createCtx<ContextType>() {
  const ctx = React.createContext<ContextType>(undefined!);
  function useSession() {
    const c = React.useContext(ctx);
    if (!c) throw new Error("useSession must be inside a SessionProvider");
    return c;
  }
  return [useSession, ctx.Provider] as const;
}

const [useSession, CtxProvider] = createCtx<SessionContextType>();

export const SessionProvider = ({ children }: { children: JSX.Element }) => {
  const [session, setSession] = React.useState<ISessionToken>();

  return (
    <CtxProvider value={{ session, setSession, isLoggedIn: !!session?.user }}>
      {children}
    </CtxProvider>
  );
};

export { useSession };
