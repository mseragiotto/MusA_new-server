import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getRoles, getRole, addRole, updateRole, deleteRole } from '../controllers/roleController';

const roleRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Roles'],
        summary: 'Get all Roles',
        operationId: 'getRoles',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of Roles',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'Roles#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No Roles found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getRoles(server, request, reply);
    });

  server.get('/:level',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Roles'],
        summary: 'Get Role by Level',
        operationId: 'getRole',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['level'],
          properties: {
            level: { type: 'number', description: 'Role level' },
          },
        },
        response: {
          200: {
            description: 'Role found',
            content: {
              'application/json': {
                schema: { $ref: 'Roles#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Role not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getRole(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Roles'],
        summary: 'Add a new Role',
        operationId: 'addRole',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['level', 'name'],
          properties: {
            level: { type: 'number', description: 'Role level' },
            name: { type: 'string', description: 'Role name' },
          },
          examples: [
            {
              level: 2,
              name: 'Editor',
            },
          ],
        },
        response: {
          201: {
            description: 'Role created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Roles#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          409: { description: 'Role already exists' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addRole(server, request, reply);
    });

  server.put('/:level',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Roles'],
        summary: 'Update Role',
        operationId: 'updateRole',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['level'],
          properties: {
            level: { type: 'number', description: 'Role level to update' },
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'New role name' },
          },
          examples: [
            {
              name: 'Updated Role Name',
            },
          ],
        },
        response: {
          200: {
            description: 'Role updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Roles#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'Role not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await updateRole(server, request, reply);
    });

  server.delete('/:level',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Roles'],
        summary: 'Delete Role',
        operationId: 'deleteRole',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['level'],
          properties: {
            level: { type: 'number', description: 'Role level to delete' },
          },
        },
        response: {
          200: {
            description: 'Role deleted successfully',
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
          404: { description: 'Role not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await deleteRole(server, request, reply);
    });
};

export default roleRoutes;