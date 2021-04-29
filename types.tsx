export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Login: undefined;
  App:
    | {
        name: string | undefined;
      }
    | undefined;
};

export type AppParamList = {
  Home:
    | {
        name: string | undefined;
      }
    | undefined;
  CreateOrganization:
    | {
        name: string | undefined;
      }
    | undefined;
  Organization:
    | {
        oid: string;
        name: string | undefined;
      }
    | undefined;
  Projects:
    | {
        project: Project;
        name: string | undefined;
      }
    | undefined;
  Datasets:
    | {
        project: Project;
        dataset: Dataset;
        name: string | undefined;
      }
    | undefined;
};

export interface Project {
  _id: string;
  createdAt: string;
  name: string;
  datasets: Dataset[];
  organization: string;
  organizer: {
    _id: string;
    email: string;
    name: string;
  };
  updatedAt: string;
}

export interface Dataset {
  _id: string;
  name: string;
  label: string;
  user: string | string[];
}