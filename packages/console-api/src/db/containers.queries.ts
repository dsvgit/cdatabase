import { dockerAxios } from "../axios/dockerAxios";
import { Container } from "db/containers.types";

export const getContainers = async () => {
  return await dockerAxios.get<Container[]>("/containers/json");
};

export const createContainer = async (image: string, port: number) => {
  return await dockerAxios.post("/containers/create", {
    Image: image,
    Env: [`PORT=${port}`],
    ExposedPorts: {
      "3000/tcp`": {},
    },
    PortBindings: {
      "3000/tcp": [
        {
          HostPort: String(port),
        },
      ],
    },
  });
};

export const startContainer = async (id: string) => {
  return await dockerAxios.post(`/containers/${id}/start`);
};

export const deleteContainer = async (id: string) => {
  return await dockerAxios.delete(`/containers/${id}`, {
    params: {
      force: true,
    },
  });
};
