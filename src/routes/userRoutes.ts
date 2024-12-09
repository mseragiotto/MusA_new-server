import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getUsers, getUser, addUser, updateUser, deleteUser } from '../controllers/userController';

const userRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['User'],
        summary: 'Get all Users',
        operationId: 'getUsers',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of Users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'User#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No Users found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getUsers(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['User'],
        summary: 'Get User by ID',
        operationId: 'getUser',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'User ID' },
          },
        },
        response: {
          200: {
            description: 'User found',
            content: {
              'application/json': {
                schema: { $ref: 'User#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'User not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await getUser(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['User'],
        summary: 'Add a new User',
        operationId: 'addUser',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['roleLevel', 'username', 'password'],
          properties: {
            roleLevel: { type: 'number', description: 'Role Level' },
            username: { type: 'string', description: 'Username' },
            password: { type: 'string', description: 'Password' },
          },
          examples: [
            {
              roleLevel: 1,
              username: 'newuser',
              password: 'password123',
            },
          ],
        },
        response: {
          201: {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'User#' },
              },
            },
          },
          400: { description: 'Invalid input or Username already taken' },
          401: { description: 'Unauthorized' },
          404: { description: 'Provided Role not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addUser(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['User'],
        summary: 'Update User',
        operationId: 'updateUser',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'User ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            roleLevel: { type: 'number', description: 'Role Level' },
            username: { type: 'string', description: 'Username' },
            password: { type: 'string', description: 'Password' },
          },
          examples: [
            {
              roleLevel: 2,
              username: 'updateduser',
              password: 'newpassword123',
            },
          ],
        },
        response: {
          200: {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'User#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'User not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await updateUser(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['User'],
        summary: 'Delete User',
        operationId: 'deleteUser',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'User ID' },
          },
        },
        response: {
          200: {
            description: 'User deleted successfully',
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
          404: { description: 'User not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await deleteUser(server, request, reply);
    });
};

export default userRoutes;