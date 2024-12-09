import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getAuthors, getAuthor, addAuthor, updateAuthor, deleteAuthor } from '../controllers/authorController';

const authorRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Author'],
        summary: 'Get all authors',
        operationId: 'getAuthors',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: 'Author#',
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'No Authors found',
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getAuthors(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Author'],
        summary: 'Get author by id',
        operationId: 'getAuthor',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'Author#',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Author not found',
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getAuthor(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Author'],
        summary: 'Add author',
        operationId: 'addAuthor',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            bio: { type: 'string' },
            image: { type: 'number' },
            published: { type: 'boolean' },
          },
          examples: [{
            name: 'John Doe',
            bio: 'Un famoso pittore',
            image: 13,
            published: true,
          }]
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'Author#',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'provided Image id not found',
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addAuthor(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Author'],
        summary: 'Update author',
        operationId: 'updateAuthor',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            bio: { type: 'string' },
            image: { type: 'number' },
            published: { type: 'boolean' },
          },
          examples: [{
            name: 'John Doe',
            bio: 'Un famoso scultore',
            image: 13,
            published: true,
          }]
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'Author#',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Author not found',
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await updateAuthor(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Author'],
        summary: 'Delete author',
        operationId: 'deleteAuthor',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        response: {
          200: {
            description: 'Author deleted successfully',
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
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Author not found',
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await deleteAuthor(server, request, reply);
    });
};

export default authorRoutes;
