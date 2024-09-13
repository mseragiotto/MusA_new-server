import "reflect-metadata";
import Fastify from "fastify";
import fastifyJWT from "@fastify/jwt";
import plugin from 'typeorm-fastify-plugin'
import typeorm from 'typeorm';
import routes from "./routes";
import management from "./server/management";
import dotenv from "dotenv";

dotenv.config();

/*const config:any = {
    "type": 'postgres',
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "synchronize": true,
    "logging": false,
    "entities": [           */
//       "src/entities/**/*.ts"
//    ],
//    "migrations": [
//       "src/migration/**/*.ts"
//    ],
//    "subscribers": [
//      "src/subscriber/**/*.ts"
//    ]
// }

const server = Fastify({ logger: true });

server.decorate("authenticate", async (request: { jwtVerify: () => any; }, reply: { send: (arg0: unknown) => void; }) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

server.register(fastifyJWT, {
  secret: process.env.JWT_SECRET || "supersecretkey",
});

server.register(plugin, {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ["src/entities/*.ts"],
  synchronize: true
});

server.register(routes);
server.register(management);

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    server.log.info("Server started on http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();