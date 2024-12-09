import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getMacroareas, getMacroarea, addMacroarea, updateMacroarea, deleteMacroarea } from '../controllers/macroareaController';

const macroareaRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Macroarea'],
        summary: 'Get all Macroareas',
        operationId: 'getMacroareas',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of Macroareas',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'Macroarea#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No Macroareas found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getMacroareas(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Macroarea'],
        summary: 'Get Macroarea by ID',
        operationId: 'getMacroarea',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Macroarea ID' },
          },
        },
        response: {
          200: {
            description: 'Macroarea found',
            content: {
              'application/json': {
                schema: { $ref: 'Macroarea#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Macroarea not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await getMacroarea(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Macroarea'],
        summary: 'Add a new Macroarea',
        operationId: 'addMacroarea',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['artworkId', 'title', 'colour'],
          properties: {
            artworkId: { type: 'number', description: 'Associated Artwork ID' },
            title: { type: 'string', description: 'Title of the Macroarea' },
            colour: { type: 'string', description: 'Colour of the Macroarea' },
          },
          examples: [
            {
              artworkId: 1,
              title: 'Macroarea Title',
              colour: '#FF5733',
            },
          ],
        },
        response: {
          201: {
            description: 'Macroarea created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Macroarea#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'Artwork not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addMacroarea(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Macroarea'],
        summary: 'Update Macroarea',
        operationId: 'updateMacroarea',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Macroarea ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            artworkId: { type: 'number', description: 'Associated Artwork ID' },
            title: { type: 'string', description: 'Title of the Macroarea' },
            colour: { type: 'string', description: 'Colour of the Macroarea' },
          },
          examples: [
            {
              artworkId: 2,
              title: 'Updated Macroarea Title',
              colour: '#33FF57',
            },
          ],
        },
        response: {
          200: {
            description: 'Macroarea updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Macroarea#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: {
            description: 'Macroarea not found or provided Artwork ID not found',
          },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await updateMacroarea(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Macroarea'],
        summary: 'Delete Macroarea',
        operationId: 'deleteMacroarea',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Macroarea ID' },
          },
        },
        response: {
          200: {
            description: 'Macroarea deleted successfully',
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
          404: { description: 'Macroarea not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await deleteMacroarea(server, request, reply);
    });
};

export default macroareaRoutes;