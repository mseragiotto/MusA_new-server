import "reflect-metadata";
import Fastify from "fastify";
import plugin from 'typeorm-fastify-plugin'
import typeorm from 'typeorm';
import routes from "./routes";
import dotenv from "dotenv";
import fastify from "fastify";

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