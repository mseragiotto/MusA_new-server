import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getFloorsConnections, getFloorsConnection, addFloorsConnection, updateFloorsConnection, deleteFloorsConnection } from '../controllers/floorConnectionController';

const floorConnectionRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['FloorConnection'],
        summary: 'Get all Floors Connections',
        operationId: 'getFloorsConnections',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of Floors Connections',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'FloorsConnection#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No Floors Connections found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getFloorsConnections(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['FloorConnection'],
        summary: 'Get Floors Connection by ID',
        operationId: 'getFloorsConnection',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Floors Connection ID' },
          },
        },
        response: {
          200: {
            description: 'Floors Connection found',
            content: {
              'application/json': {
                schema: { $ref: 'FloorsConnection#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Floors Connection not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await getFloorsConnection(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['FloorConnection'],
        summary: 'Add a new Floors Connection',
        operationId: 'addFloorsConnection',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: [
            'connection_groupId',
            'source_floorId',
            'target_floorId',
            'x_meters',
            'y_meters',
            'x_pixels',
            'y_pixels',
            'latitude',
            'longitude',
          ],
          properties: {
            connection_groupId: { type: 'number', description: 'Connection Group ID' },
            source_floorId: { type: 'number', description: 'Source Floor ID' },
            target_floorId: { type: 'number', description: 'Target Floor ID' },
            x_meters: { type: 'number', description: 'X coordinate in meters' },
            y_meters: { type: 'number', description: 'Y coordinate in meters' },
            x_pixels: { type: 'number', description: 'X coordinate in pixels' },
            y_pixels: { type: 'number', description: 'Y coordinate in pixels' },
            latitude: { type: 'number', description: 'Latitude' },
            longitude: { type: 'number', description: 'Longitude' },
          },
          examples: [
            {
              connection_groupId: 1,
              source_floorId: 2,
              target_floorId: 3,
              x_meters: 10.5,
              y_meters: 20.5,
              x_pixels: 200,
              y_pixels: 400,
              latitude: 40.7128,
              longitude: -74.0060,
            },
          ],
        },
        response: {
          201: {
            description: 'Floors Connection created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'FloorsConnection#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: {
            description: 'Connection Group, Source Floor, or Target Floor not found',
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addFloorsConnection(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['FloorConnection'],
        summary: 'Update Floors Connection',
        operationId: 'updateFloorsConnection',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Floors Connection ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            connection_groupId: { type: 'number', description: 'Connection Group ID' },
            source_floorId: { type: 'number', description: 'Source Floor ID' },
            target_floorId: { type: 'number', description: 'Target Floor ID' },
            x_meters: { type: 'number', description: 'X coordinate in meters' },
            y_meters: { type: 'number', description: 'Y coordinate in meters' },
            x_pixels: { type: 'number', description: 'X coordinate in pixels' },
            y_pixels: { type: 'number', description: 'Y coordinate in pixels' },
            latitude: { type: 'number', description: 'Latitude' },
            longitude: { type: 'number', description: 'Longitude' },
          },
          examples: [
            {
              connection_groupId: 2,
              source_floorId: 3,
              target_floorId: 4,
              x_meters: 15.5,
              y_meters: 25.5,
              x_pixels: 250,
              y_pixels: 450,
              latitude: 34.0522,
              longitude: -118.2437,
            },
          ],
        },
        response: {
          200: {
            description: 'Floors Connection updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'FloorsConnection#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: {
            description:
              'Floors Connection not found or Connection Group, Source Floor, or Target Floor not found',
          },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await updateFloorsConnection(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['FloorConnection'],
        summary: 'Delete Floors Connection',
        operationId: 'deleteFloorsConnection',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Floors Connection ID' },
          },
        },
        response: {
          200: {
            description: 'Floors Connection deleted successfully',
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
          404: { description: 'Floors Connection not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await deleteFloorsConnection(server, request, reply);
    });
};

export default floorConnectionRoutes;