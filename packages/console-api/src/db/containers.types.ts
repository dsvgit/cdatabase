export type Container = {
  Id: string;
  Image: string;
  State: string;
  Status: string;
  Ports: { PrivatePort: number; PublicPort?: number }[];
};
