const axios = require("axios");

const Image = "cdatabase/instance:1.0.0";

const dockerapi = axios.create({
  baseURL: "http://localhost/v1.41",
  socketPath: "/var/run/docker.sock",
});

async function main() {
  const port = process.argv[2];

  await startContainer(port);

  console.log(`started on: ${port}!`);
}

main();

async function getList() {
  const response = await dockerapi.get("/images/json");

  return response;
}

async function startContainer(port) {
  const createResponse = await dockerapi.post("/containers/create", {
    Image,
    Env: [`PORT=${port}`],
    ExposedPorts: {
      "3000/tcp`": {},
    },
    PortBindings: {
      "3000/tcp": [
        {
          HostPort: port,
        },
      ],
    },
  });

  const { Id } = createResponse.data;

  const startResponse = await dockerapi.post(`/containers/${Id}/start`);

  console.log(startResponse);
}
