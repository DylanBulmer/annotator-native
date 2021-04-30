import React from "react";
import { AppService } from "../utils/services";

export interface Organization {
  name?: string;
  members?: string[];
}

const OrganizationContext = React.createContext<Organization | undefined>(undefined);

function OrganizationReducer(state: Organization, payload: Organization) {
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

function OrganizationProvider({ children }: { children: JSX.Element }) {
  // @ts-ignore
  const [state, dispatch] = React.useReducer(OrganizationReducer, null);
  return (
    // @ts-ignore
    <OrganizationContext.Provider value={[state, dispatch]}>
      {children}
    </OrganizationContext.Provider>
  );
}

function useOrganization({ oid }: {oid: string}) {
  // @ts-ignore
  const [state, setState] = React.useContext(OrganizationContext);
  if (state === undefined) {
    throw new Error(
      "useOrganization must be used within a OrganizationProvider"
    );
  }

  // simple check to ensure Organization data is available (if oid is given).
  if (oid && (state === null || state?._id !== oid)) {
    AppService.getOrganization(oid).then((org) => setState(org));
  }

  return [state, setState];
}

export { OrganizationProvider, useOrganization };