import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getConnectionGroups, getConnectionGroup, addConnectionGroup, updateConnectionGroup, deleteConnectionGroup } from '../controllers/connectionGroupController';

const connectionGroupRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ConnectionGroup'],
        summary: 'Get all Connection Groups',
        operationId: 'getConnectionGroups',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of Connection Groups',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'ConnectionGroup#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No Connection Groups found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getConnectionGroups(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ConnectionGroup'],
        summary: 'Get Connection Group by ID',
        operationId: 'getConnectionGroup',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Connection Group ID' },
          },
        },
        response: {
          200: {
            description: 'Connection Group found',
            content: {
              'application/json': {
                schema: { $ref: 'ConnectionGroup#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Connection Group not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await getConnectionGroup(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ConnectionGroup'],
        summary: 'Add a new Connection Group',
        operationId: 'addConnectionGroup',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['museumId', 'name', 'type'],
          properties: {
            museumId: { type: 'number', description: 'Museum ID' },
            name: { type: 'string', description: 'Name of the Connection Group' },
            type: { type: 'string', description: 'Type of the Connection Group' },
          },
          examples: [
            {
              museumId: 1,
              name: 'Main Entrance',
              type: 'Stairs',
            },
          ],
        },
        response: {
          201: {
            description: 'Connection Group created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'ConnectionGroup#' },
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
      await addConnectionGroup(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ConnectionGroup'],
        summary: 'Update Connection Group',
        operationId: 'updateConnectionGroup',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Connection Group ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            museumId: { type: 'number', description: 'Museum ID' },
            name: { type: 'string', description: 'Name of the Connection Group' },
            type: { type: 'string', description: 'Type of the Connection Group' },
          },
          examples: [
            {
              museumId: 2,
              name: 'Updated Entrance',
              type: 'Elevator',
            },
          ],
        },
        response: {
          200: {
            description: 'Connection Group updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'ConnectionGroup#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: {
            description: 'Connection Group not found or provided Museum ID not found',
          },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await updateConnectionGroup(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ConnectionGroup'],
        summary: 'Delete Connection Group',
        operationId: 'deleteConnectionGroup',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Connection Group ID' },
          },
        },
        response: {
          200: {
            description: 'Connection Group deleted successfully',
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
          404: { description: 'Connection Group not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await deleteConnectionGroup(server, request, reply);
    });
};

export default connectionGroupRoutes;