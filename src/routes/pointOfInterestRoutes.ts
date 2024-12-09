import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getPointsOfInterest, getPointOfInterest, addPointOfInterest, updatePointOfInterest, deletePointOfInterest } from '../controllers/pointOfInterestController';

const pointOfInterestRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['PointOfInterest'],
        summary: 'Get all Points of Interest',
        operationId: 'getPointsOfInterest',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of Points of Interest',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'PointsOfInterest#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No Points of Interest found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getPointsOfInterest(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['PointOfInterest'],
        summary: 'Get Point of Interest by ID',
        operationId: 'getPointOfInterest',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Point of Interest ID' },
          },
        },
        response: {
          200: {
            description: 'Point of Interest found',
            content: {
              'application/json': {
                schema: { $ref: 'PointsOfInterest#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Point of Interest not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await getPointOfInterest(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['PointOfInterest'],
        summary: 'Add a new Point of Interest',
        operationId: 'addPointOfInterest',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: [
            'name',
            'floorId',
            'x_meters',
            'y_meters',
            'x_pixels',
            'y_pixels',
            'latitude',
            'longitude',
            'categoryId',
            'published',
          ],
          properties: {
            name: { type: 'string', description: 'Name of the Point of Interest' },
            floorId: { type: 'number', description: 'Associated Floor ID' },
            x_meters: { type: 'number', description: 'X-coordinate in meters' },
            y_meters: { type: 'number', description: 'Y-coordinate in meters' },
            x_pixels: { type: 'number', description: 'X-coordinate in pixels' },
            y_pixels: { type: 'number', description: 'Y-coordinate in pixels' },
            latitude: { type: 'number', description: 'Latitude coordinate' },
            longitude: { type: 'number', description: 'Longitude coordinate' },
            categoryId: { type: 'number', description: 'Associated Category ID' },
            published: { type: 'boolean', description: 'Publication status' },
          },
          examples: [
            {
              name: 'Example Point of Interest',
              floorId: 1,
              x_meters: 10.5,
              y_meters: 20.3,
              x_pixels: 150,
              y_pixels: 250,
              latitude: 40.7128,
              longitude: -74.0060,
              categoryId: 2,
              published: true,
            },
          ],
        },
        response: {
          201: {
            description: 'Point of Interest created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'PointsOfInterest#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'Provided floor or category attributes not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addPointOfInterest(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['PointOfInterest'],
        summary: 'Update Point of Interest',
        operationId: 'updatePointOfInterest',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Point of Interest ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Name of the Point of Interest' },
            floorId: { type: 'number', description: 'Associated Floor ID' },
            x_meters: { type: 'number', description: 'X-coordinate in meters' },
            y_meters: { type: 'number', description: 'Y-coordinate in meters' },
            x_pixels: { type: 'number', description: 'X-coordinate in pixels' },
            y_pixels: { type: 'number', description: 'Y-coordinate in pixels' },
            latitude: { type: 'number', description: 'Latitude coordinate' },
            longitude: { type: 'number', description: 'Longitude coordinate' },
            categoryId: { type: 'number', description: 'Associated Category ID' },
            published: { type: 'boolean', description: 'Publication status' },
          },
          examples: [
            {
              name: 'Updated Point of Interest',
              floorId: 2,
              x_meters: 15.0,
              y_meters: 25.0,
              x_pixels: 200,
              y_pixels: 300,
              latitude: 34.0522,
              longitude: -118.2437,
              categoryId: 3,
              published: false,
            },
          ],
        },
        response: {
          200: {
            description: 'Point of Interest updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'PointsOfInterest#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: {
            description:
              'Point of Interest not found or provided floor/category attributes not found',
          },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await updatePointOfInterest(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['PointOfInterest'],
        summary: 'Delete Point of Interest',
        operationId: 'deletePointOfInterest',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Point of Interest ID' },
          },
        },
        response: {
          200: {
            description: 'Point of Interest deleted successfully',
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
          404: { description: 'Point of Interest not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await deletePointOfInterest(server, request, reply);
    });
};

export default pointOfInterestRoutes;