import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getChapters, getChapter, addChapter, updateChapter, deleteChapter } from '../controllers/chapterController';

const chapterRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Chapter'],
        summary: 'Get all Chapters',
        operationId: 'getChapters',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'Chapter#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No Chapters found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getChapters(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Chapter'],
        summary: 'Get Chapter by id',
        operationId: 'getChapter',
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
            description: 'Chapter found',
            content: {
              'application/json': {
                schema: { $ref: 'Chapter#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Chapter not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await getChapter(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Chapter'],
        summary: 'Add a new Chapter',
        operationId: 'addChapter',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: [
            'title',
            'text',
            'number',
            'overlay_imageId',
            'artworkId',
            'touch_areaId',
            'audioId',
            'published',
          ],
          properties: {
            title: { type: 'string' },
            text: { type: 'string' },
            number: { type: 'number' },
            overlay_imageId: { type: 'number' },
            artworkId: { type: 'number' },
            touch_areaId: { type: 'number' },
            audioId: { type: 'number' },
            published: { type: 'boolean' },
          },
          examples: [{
            title: 'Chapter Title',
            text: 'Chapter text',
            number: 1,
            overlay_imageId: 10,
            artworkId: 20,
            touch_areaId: 30,
            audioId: 40,
            published: true,
          }],
        },
        response: {
          201: {
            description: 'Chapter created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Chapter#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'Related entity not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addChapter(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Chapter'],
        summary: 'Update Chapter',
        operationId: 'updateChapter',
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
            title: { type: 'string' },
            text: { type: 'string' },
            number: { type: 'number' },
            overlay_imageId: { type: 'number' },
            artworkId: { type: 'number' },
            touch_areaId: { type: 'number' },
            audioId: { type: 'number' },
            published: { type: 'boolean' },
          },
          examples: [{
            title: 'Updated Title',
            text: 'Updated text',
            number: 2,
            overlay_imageId: 11,
            artworkId: 21,
            touch_areaId: 31,
            audioId: 41,
            published: false,
          }],
        },
        response: {
          200: {
            description: 'Chapter updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Chapter#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: {
            description: 'Chapter not found or related entity not found',
          },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await updateChapter(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Chapter'],
        summary: 'Delete Chapter',
        operationId: 'deleteChapter',
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
            description: 'Chapter deleted successfully',
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
          404: { description: 'Chapter not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await deleteChapter(server, request, reply);
    });
};

export default chapterRoutes;