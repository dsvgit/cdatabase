import { consoleAxios } from "api/consoleAxios";
import { Project } from "db/projects.types";

export const getProjects = () => {
  return consoleAxios.get<Project[]>("/projects");
};

export const createProject = ({ name }: { name: string }) => {
  return consoleAxios.post("/projects/create", {
    name,
  });
};

export const removeProject = ({ id }: { id: number }) => {
  return consoleAxios.delete(`/projects/${id}`);
};
