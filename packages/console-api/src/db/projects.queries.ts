import prisma from "./prisma";
import { CreateProjectInput, UpdateProjectInput } from "./projects.types";

export const getProjects = async () => {
  return await prisma.project.findMany();
};

export const getProject = async (id: number) => {
  return await prisma.project.findFirst({
    where: { id },
  });
};

export const createProject = async (data: CreateProjectInput) => {
  return await prisma.project.create({
    data,
  });
};

export const updateProject = async (id: number, data: UpdateProjectInput) => {
  return await prisma.project.update({
    data,
    where: { id },
  });
};

export const deleteProject = async (id: number) => {
  return await prisma.project.delete({
    where: { id },
  });
};
