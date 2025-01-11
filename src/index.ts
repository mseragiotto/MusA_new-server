import 'reflect-metadata';
import Fastify from 'fastify';
import fastifyJWT from '@fastify/jwt';
import plugin from 'typeorm-fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';
import routes from './routes';
import dotenv from 'dotenv';
import schema from './schema';

dotenv.config();

const server = Fastify({ logger: true });

// Register fastify-multipart plugin
server.register(fastifyMultipart, {
  //attachFieldsToBody: true,   // attach multipart fields to request.body
  limits: {
    fileSize: 10_000_000,     // 10MB
  },
});

// Register fastify-cors plugin
/*
in case of strict rules, use this configuration:
origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', 'https://myapp.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
*/
server.register(fastifyCors, {
  origin: '*', // Indica l'origine consentita
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specifica i metodi consentiti
  credentials: true, // Permette l'invio di cookie e credenziali
});

server.decorate('authenticate', async (request: { jwtVerify: () => Promise<void>; }, reply: { send: (arg0: unknown) => void; }) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// Register each schema with Fastify
for (const schemaKey in schema) {
  if (Object.prototype.hasOwnProperty.call(schema, schemaKey)) {
    server.addSchema(schema[schemaKey]);
  }
}

// Register Swagger plugin
server.register(fastifySwagger, {
  hideUntagged: true,
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'MUSA NEW Server API',
      description: 'MUSA NEW Server REST API with Fastify, TypeORM and JWT',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'MUSA Local server'
      }
    ],
    tags: [
      { name: 'ArlArtwork' },
      { name: 'ArlFloor' },
      { name: 'Artwork' },
      { name: 'Audio' },
      { name: 'Author' },
      { name: 'ChapterArea' },
      { name: 'Chapter' },
      { name: 'ConnectionGroup' },
      { name: 'FloorsConnection' },
      { name: 'Floor' },
      { name: 'Graph' },
      { name: 'Image' },
      { name: 'Macroarea' },
      { name: 'Museum' },
      { name: 'PointOfInterestCategories' },
      { name: 'PointOfInterest' },
      { name: 'Roles' },
      { name: 'RouteArtwork' },
      { name: 'Route' },
      { name: 'User' },
      { name: 'Database' },
      { name: 'Auth' },
      { name: 'Health' }
    ],
    components: {
      schemas: schema,
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  refResolver: {
    buildLocalReference(json, baseUri, fragment, i) {
      console.log('DEBUG ---' + json.$id);
      return json.$id ? String(json.$id) : `id-${i}`;
    },
  }
});

// Register @fastify/swagger-ui
server.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

// Register JWT plugin
server.register(fastifyJWT, {
  secret: process.env.JWT_SECRET || 'supersecretkey',
});

// Register TypeORM plugin
server.register(plugin, {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['src/entities/*.ts'],
  synchronize: true
});

// Register routes
server.register(routes);

// Start the server
const start = async () => {
  try {
    await server.listen({ port: 3000 });
    server.log.info('Server started on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();