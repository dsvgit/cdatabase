const Fastify = require("fastify");

const server = Fastify({ logger: true });

const config = {
  PORT: 3000,
};

if (!config.PORT) {
  console.error("Port must be specified");
  process.exit(1);
}

server.get("/", (request, reply) => {
  return "cdatabase is here!"
});

async function main() {
  try {
    await server.listen(config.PORT, "0.0.0.0");
    console.log(`Server ready at http://localhost:${config.PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
