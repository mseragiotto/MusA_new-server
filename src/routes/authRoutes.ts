import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { register, login, changePassword } from '../controllers/authController';

const authRoutes: FastifyPluginAsync = async (server) => {
  server.post('/register',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Register user',
        operationId: 'register',
        body: {
          type: 'object',
          required: ['username', 'password', 'role'],
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'number' }
          },
          examples: [{
            username: 'user',
            password: 'password',
            role: 1
          }]
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              id: { type: 'number' },
              username: { type: 'string' },
              role: { type: 'string' }
            }
          },
          400: {
            description: 'Bad request'
          },
          409: {
            description: 'Conflict'
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await register(server, request, reply);
    });

  server.post('/login',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Login',
        operationId: 'login',
        body: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string' },
            password: { type: 'string' }
          },
          examples: [{
            username: 'user@email.com',
            password: 'password123456'
          }]
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              token: { type: 'string' }
            }
          },
          400: {
            description: 'Bad request'
          },
          401: {
            description: 'Unauthorized'
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await login(server, request, reply);
    });

  server.post('/change-password',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Auth'],
        summary: 'Change password',
        operationId: 'changePassword',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['password', 'newPassword'],
          properties: {
            password: { type: 'string' },
            newPassword: { type: 'string' }
          },
          examples: [{
            password: 'password123456',
            newPassword: 'password1234567'
          }]
        },
        response: {
          200: {
            description: 'Successful response'
          },
          400: {
            description: 'Bad request'
          },
          401: {
            description: 'Unauthorized'
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await changePassword(server, request, reply);
    });
};

export default authRoutes;