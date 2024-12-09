import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getChapterAreas, getChapterArea, addChapterArea, updateChapterArea, deleteChapterArea } from '../controllers/chapterAreaController';

const chapterAreaRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ChapterArea'],
        summary: 'Get all ChapterAreas',
        operationId: 'getChapterAreas',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'ChapterArea#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No ChapterAreas found' }
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getChapterAreas(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ChapterArea'],
        summary: 'Get ChapterArea by id',
        operationId: 'getChapterArea',
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
            description: 'Successful response',
            content: {
              'application/json': {
                schema: { $ref: 'ChapterArea#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'ChapterArea not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getChapterArea(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ChapterArea'],
        summary: 'Add a new ChapterArea',
        operationId: 'addChapterArea',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['chapterId', 'macroareaId'],
          properties: {
            chapterId: { type: 'number' },
            macroareaId: { type: 'number' },
          },
          examples: [{
            chapterId: 1,
            macroareaId: 2,
          }],
        },
        response: {
          200: {
            description: 'ChapterArea created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'ChapterArea#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Chapter or Macroarea not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addChapterArea(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ChapterArea'],
        summary: 'Update ChapterArea',
        operationId: 'updateChapterArea',
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
            chapterId: { type: 'number' },
            macroareaId: { type: 'number' },
          },
          examples: [{
            chapterId: 3,
            macroareaId: 4,
          }],
        },
        response: {
          200: {
            description: 'ChapterArea updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'ChapterArea#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: {
            description:
              'ChapterArea not found or provided Chapter/Macroarea id not found',
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await updateChapterArea(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ChapterArea'],
        summary: 'Delete ChapterArea',
        operationId: 'deleteChapterArea',
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
            description: 'ChapterArea deleted successfully',
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
          404: { description: 'ChapterArea not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await deleteChapterArea(server, request, reply);
    });
};

export default chapterAreaRoutes;