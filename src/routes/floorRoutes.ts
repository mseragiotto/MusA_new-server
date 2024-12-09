import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getFloor, getFloors, addFloor, updateFloor, deleteFloor } from '../controllers/floorController';

const floorRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Floor'],
        summary: 'Get all Floors',
        operationId: 'getFloors',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of Floors',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'Floor#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No Floors found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getFloors(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Floor'],
        summary: 'Get Floor by ID',
        operationId: 'getFloor',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Floor ID' },
          },
        },
        response: {
          200: {
            description: 'Floor found',
            content: {
              'application/json': {
                schema: { $ref: 'Floor#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Floor not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
      await getFloor(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Floor'],
        summary: 'Add a new Floor',
        operationId: 'addFloor',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: [
            'museumId',
            'name',
            'floor_order',
            'latitude',
            'longitude',
            'rotation',
            'width',
            'height',
            'main_floor',
            'imageId',
            'graphId',
            'published',
            'arl_floorId',
            'creation_date',
            'last_update',
            'version',
          ],
          properties: {
            museumId: { type: 'number', description: 'Museum ID' },
            name: { type: 'string', description: 'Name of the Floor' },
            floor_order: { type: 'number', description: 'Order of the Floor' },
            latitude: { type: 'number', description: 'Latitude' },
            longitude: { type: 'number', description: 'Longitude' },
            rotation: { type: 'number', description: 'Rotation' },
            width: { type: 'number', description: 'Width' },
            height: { type: 'number', description: 'Height' },
            main_floor: { type: 'boolean', description: 'Is Main Floor' },
            imageId: { type: 'number', description: 'Image ID' },
            graphId: { type: 'number', description: 'Graph ID' },
            published: { type: 'boolean', description: 'Is Published' },
            arl_floorId: { type: 'number', description: 'ARL Floor ID' },
            creation_date: {
              type: 'string',
              format: 'date-time',
              description: 'Creation Date',
            },
            last_update: {
              type: 'string',
              format: 'date-time',
              description: 'Last Update',
            },
            version: { type: 'number', description: 'Version' },
          },
          examples: [
            {
              museumId: 1,
              name: 'First Floor',
              floor_order: 1,
              latitude: 40.7128,
              longitude: -74.0060,
              rotation: 0,
              width: 500,
              height: 300,
              main_floor: true,
              imageId: 10,
              graphId: 5,
              published: true,
              arl_floorId: 2,
              creation_date: '2023-01-01T12:00:00Z',
              last_update: '2023-01-10T12:00:00Z',
              version: 1,
            },
          ],
        },
        response: {
          201: {
            description: 'Floor created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Floor#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: {
            description: 'Museum, Image, Graph, or ARL Floor not found',
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addFloor(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Floor'],
        summary: 'Update Floor',
        operationId: 'updateFloor',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Floor ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            museumId: { type: 'number', description: 'Museum ID' },
            name: { type: 'string', description: 'Name of the Floor' },
            floor_order: { type: 'number', description: 'Order of the Floor' },
            latitude: { type: 'number', description: 'Latitude' },
            longitude: { type: 'number', description: 'Longitude' },
            rotation: { type: 'number', description: 'Rotation' },
            width: { type: 'number', description: 'Width' },
            height: { type: 'number', description: 'Height' },
            main_floor: { type: 'boolean', description: 'Is Main Floor' },
            imageId: { type: 'number', description: 'Image ID' },
            graphId: { type: 'number', description: 'Graph ID' },
            published: { type: 'boolean', description: 'Is Published' },
            arl_floorId: { type: 'number', description: 'ARL Floor ID' },
            creation_date: {
              type: 'string',
              format: 'date-time',
              description: 'Creation Date',
            },
            last_update: {
              type: 'string',
              format: 'date-time',
              description: 'Last Update',
            },
            version: { type: 'number', description: 'Version' },
          },
          examples: [
            {
              museumId: 1,
              name: 'Updated Floor Name',
              floor_order: 2,
              latitude: 34.0522,
              longitude: -118.2437,
              rotation: 90,
              width: 600,
              height: 400,
              main_floor: false,
              imageId: 12,
              graphId: 6,
              published: false,
              arl_floorId: 3,
              creation_date: '2023-02-01T12:00:00Z',
              last_update: '2023-02-10T12:00:00Z',
              version: 2,
            },
          ],
        },
        response: {
          200: {
            description: 'Floor updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Floor#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: {
            description: 'Floor not found or related entities not found',
          },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
      await updateFloor(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Floor'],
        summary: 'Delete Floor',
        operationId: 'deleteFloor',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Floor ID' },
          },
        },
        response: {
          200: {
            description: 'Floor deleted successfully',
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
          404: { description: 'Floor not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
      await deleteFloor(server, request, reply);
    });
};

export default floorRoutes;