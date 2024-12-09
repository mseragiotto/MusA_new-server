import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getPointOfInterestCategories, getPointOfInterestCategory, addPointOfInterestCategory, updatePointOfInterestCategory, deletePointOfInterestCategory } from '../controllers/pointOfInterestCategoryController';

const pointOfInterestCategoryRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['PointOfInterestCategory'],
        summary: 'Get all Point of Interest Categories',
        operationId: 'getPointOfInterestCategories',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of Point of Interest Categories',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'PointOfInterestCategories#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No Point of Interest Categories found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getPointOfInterestCategories(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['PointOfInterestCategory'],
        summary: 'Get Point of Interest Category by ID',
        operationId: 'getPointOfInterestCategory',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Category ID' },
          },
        },
        response: {
          200: {
            description: 'Point of Interest Category found',
            content: {
              'application/json': {
                schema: { $ref: 'PointOfInterestCategories#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Point of Interest Category not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await getPointOfInterestCategory(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['PointOfInterestCategory'],
        summary: 'Add a new Point of Interest Category',
        operationId: 'addPointOfInterestCategory',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['name', 'museumId', 'width_pixels', 'height_pixels', 'colour', 'imageId'],
          properties: {
            name: { type: 'string', description: 'Name of the category' },
            museumId: { type: 'number', description: 'Associated Museum ID' },
            width_pixels: { type: 'number', description: 'Width in pixels' },
            height_pixels: { type: 'number', description: 'Height in pixels' },
            colour: { type: 'string', description: 'Colour in HEX code' },
            imageId: { type: 'number', description: 'Associated Image ID' },
          },
          examples: [
            {
              name: 'Category Example',
              museumId: 1,
              width_pixels: 100,
              height_pixels: 200,
              colour: '#FF5733',
              imageId: 5,
            },
          ],
        },
        response: {
          201: {
            description: 'Point of Interest Category created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'PointOfInterestCategories#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'Provided museum or image attributes not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addPointOfInterestCategory(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['PointOfInterestCategory'],
        summary: 'Update Point of Interest Category',
        operationId: 'updatePointOfInterestCategory',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Category ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Name of the category' },
            museumId: { type: 'number', description: 'Associated Museum ID' },
            width_pixels: { type: 'number', description: 'Width in pixels' },
            height_pixels: { type: 'number', description: 'Height in pixels' },
            colour: { type: 'string', description: 'Colour in HEX code' },
            imageId: { type: 'number', description: 'Associated Image ID' },
          },
          examples: [
            {
              name: 'Updated Category',
              museumId: 2,
              width_pixels: 150,
              height_pixels: 250,
              colour: '#33FF57',
              imageId: 6,
            },
          ],
        },
        response: {
          200: {
            description: 'Point of Interest Category updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'PointOfInterestCategories#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: {
            description: 'Point of Interest Category not found or provided attributes not found',
          },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await updatePointOfInterestCategory(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['PointOfInterestCategory'],
        summary: 'Delete Point of Interest Category',
        operationId: 'deletePointOfInterestCategory',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Category ID' },
          },
        },
        response: {
          200: {
            description: 'Point of Interest Category deleted successfully',
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
          404: { description: 'Point of Interest Category not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await deletePointOfInterestCategory(server, request, reply);
    });
};

export default pointOfInterestCategoryRoutes;