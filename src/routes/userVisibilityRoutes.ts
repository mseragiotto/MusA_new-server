import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import {
  getSingleUserVisibility,
  createSingleUserVisibility,
  editSingleUserVisibility,
  deleteSingleUserVisibility,
} from '../controllers/userVisibilityController';

const userVisibilityRoutes: FastifyPluginAsync = async (server) => {
  server.get(
    '/:userId',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['UserVisibility'],
        summary: 'Get museums visible for a user',
        operationId: 'getSingleUserVisibility',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['userId'],
          properties: {
            userId: { type: 'number', description: 'User ID' },
          },
        },
        response: {
          200: {
            description: 'List of museum IDs',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { type: 'number' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No museums found for this user' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { userId: number } }>, reply: FastifyReply) => {
      await getSingleUserVisibility(server, request, reply);
    }
  );

  server.post(
    '/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['UserVisibility'],
        summary: 'Create a new User Visibility assignment',
        operationId: 'createSingleUserVisibility',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['userId', 'museumId'],
          properties: {
            userId: { type: 'number', description: 'User ID' },
            museumId: { type: 'number', description: 'Museum ID' },
          },
          examples: [
            {
              userId: 1,
              museumId: 2,
            },
          ],
        },
        response: {
          201: {
            description: 'User Visibility assignment created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'UserVisibility#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'User or Museum not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await createSingleUserVisibility(server, request, reply);
    }
  );

  server.put(
    '/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['UserVisibility'],
        summary: 'Update a User Visibility assignment',
        operationId: 'editSingleUserVisibility',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'UserVisibility assignment ID' },
          },
        },
        body: {
          type: 'object',
          required: ['userId', 'museumId'],
          properties: {
            userId: { type: 'number', description: 'User ID' },
            museumId: { type: 'number', description: 'Museum ID' },
          },
          examples: [
            {
              userId: 1,
              museumId: 3,
            },
          ],
        },
        response: {
          200: {
            description: 'User Visibility assignment updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'UserVisibility#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'UserVisibility or related User/Museum not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
      await editSingleUserVisibility(server, request, reply);
    }
  );

  server.delete(
    '/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['UserVisibility'],
        summary: 'Delete a User Visibility assignment',
        operationId: 'deleteSingleUserVisibility',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'UserVisibility assignment ID' },
          },
        },
        response: {
          200: {
            description: 'User Visibility assignment deleted successfully',
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
          404: { description: 'UserVisibility not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
      await deleteSingleUserVisibility(server, request, reply);
    }
  );
};

export default userVisibilityRoutes;