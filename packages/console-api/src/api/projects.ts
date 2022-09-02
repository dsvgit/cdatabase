import { FastifyReply, FastifyRequest } from "fastify";

import {
  createContainer,
  deleteContainer,
  getContainers,
  startContainer,
} from "../db/containers.queries";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../db/projects.queries";

export class ProjectsApi {
  private Image: string;

  constructor({ Image }: { Image: string }) {
    this.Image = Image;
  }

  list = async (request: FastifyRequest, reply: FastifyReply) => {
    const { data: containers } = await getContainers();
    const containersMap = new Map(containers.map((x) => [x.Id, x]));
    const projects = await getProjects();

    return projects
      .filter((x) => x.containerId)
      .map((x) => ({
        ...x,
        ...containersMap.get(x.containerId!),
      }));
  };

  create = async (
    request: FastifyRequest<{
      Body: { name: string };
    }>,
    reply: FastifyReply
  ) => {
    const { name } = request.body;

    if (!name) {
      return reply.status(400).send("Name must be specified!");
    }

    try {
      const project = await createProject({
        name,
      });

      const createResponse = await createContainer(
        this.Image,
        60000 + project.id
      );

      const { Id } = createResponse.data;

      await updateProject(project.id, { containerId: Id });

      const startResponse = await startContainer(Id);

      return startResponse.data;
    } catch (error) {
      console.error(error);
      return reply.status(400).send("Error");
    }
  };

  remove = async (
    request: FastifyRequest<{
      Params: { id: number };
    }>,
    reply: FastifyReply
  ) => {
    const id = Number(request.params.id);

    const project = await getProject(id);

    if (project) {
      if (project.containerId) {
        await deleteContainer(project.containerId);
      }

      await deleteProject(id);
    } else {
      return reply.status(400).send("Project not found");
    }
  };
}
