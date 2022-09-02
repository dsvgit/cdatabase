import Fastify from "fastify";
import cors from "@fastify/cors";

import { ProjectsApi } from "./api/projects";

const Image = "cdatabase/instance:1.0.0";

const server = Fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

const config = {
  PORT: 4001,
};

if (!config.PORT) {
  console.error("Port must be specified");
  process.exit(1);
}

async function main() {
  const containersApi = new ProjectsApi({ Image });

  server.get("/", async (request, reply) => {
    return "Cloud Database Service Console API";
  });

  server.get("/projects", containersApi.list);
  server.post("/projects/create", containersApi.create);
  server.delete("/projects/:id", containersApi.remove);

  try {
    await server.listen(config.PORT, "0.0.0.0");

    console.log(`Server ready at http://localhost:${config.PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
