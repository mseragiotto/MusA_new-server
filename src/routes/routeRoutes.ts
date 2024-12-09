import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getRoutes, getRoute, addRoute, updateRoute, deleteRoute } from '../controllers/routeController';

const routeRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Route'],
        summary: 'Get all Routes',
        operationId: 'getRoutes',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of Routes',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'Route#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No Routes found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getRoutes(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Route'],
        summary: 'Get Route by ID',
        operationId: 'getRoute',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Route ID' },
          },
        },
        response: {
          200: {
            description: 'Route found',
            content: {
              'application/json': {
                schema: { $ref: 'Route#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Route not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await getRoute(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Route'],
        summary: 'Add a new Route',
        operationId: 'addRoute',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['museumId', 'name', 'description'],
          properties: {
            museumId: { type: 'number', description: 'Museum ID' },
            name: { type: 'string', description: 'Name of the Route' },
            description: { type: 'string', description: 'Description of the Route' },
          },
          examples: [
            {
              museumId: 1,
              name: 'Historic Tour',
              description: 'A tour showcasing historical artifacts',
            },
          ],
        },
        response: {
          201: {
            description: 'Route created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Route#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'Provided Museum ID not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addRoute(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Route'],
        summary: 'Update Route',
        operationId: 'updateRoute',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Route ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            museumId: { type: 'number', description: 'Museum ID' },
            name: { type: 'string', description: 'Name of the Route' },
            description: { type: 'string', description: 'Description of the Route' },
          },
          examples: [
            {
              museumId: 2,
              name: 'Updated Route Name',
              description: 'An updated description of the route',
            },
          ],
        },
        response: {
          200: {
            description: 'Route updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Route#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: {
            description: 'Route not found or provided Museum ID not found',
          },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await updateRoute(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Route'],
        summary: 'Delete Route',
        operationId: 'deleteRoute',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Route ID' },
          },
        },
        response: {
          200: {
            description: 'Route deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Route not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await deleteRoute(server, request, reply);
    });
};

export default routeRoutes;