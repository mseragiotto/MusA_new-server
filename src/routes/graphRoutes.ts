import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getGraphs, getGraph, addGraph, updateGraph, deleteGraph } from '../controllers/graphController';

const graphRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Graph'],
        summary: 'Get all Graphs',
        operationId: 'getGraphs',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'Graph#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No Graphs found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getGraphs(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Graph'],
        summary: 'Get Graph by id',
        operationId: 'getGraph',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Graph found',
            content: {
              'application/json': {
                schema: { $ref: 'Graph#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Graph not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await getGraph(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Graph'],
        summary: 'Add a new Graph',
        operationId: 'addGraph',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['name', 'data'],
          properties: {
            name: { type: 'string' },
            data: { type: 'object' },
            description: { type: 'string' },
          },
          examples: [{
            name: 'Sample Graph',
            data: { /* Graph data structure */ },
            description: 'This is a sample graph.',
          }],
        },
        response: {
          201: {
            description: 'Graph created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Graph#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addGraph(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Graph'],
        summary: 'Update Graph',
        operationId: 'updateGraph',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            data: { type: 'object' },
            description: { type: 'string' },
          },
          examples: [{
            name: 'Updated Graph Name',
            data: { /* Updated graph data structure */ },
            description: 'Updated description.',
          }],
        },
        response: {
          200: {
            description: 'Graph updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Graph#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'Graph not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await updateGraph(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Graph'],
        summary: 'Delete Graph',
        operationId: 'deleteGraph',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Graph deleted successfully',
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
          404: { description: 'Graph not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await deleteGraph(server, request, reply);
    });
};

export default graphRoutes;