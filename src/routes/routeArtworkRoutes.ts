import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getRouteArtworks, getRouteArtwork, addRouteArtwork, updateRouteArtwork, deleteRouteArtwork } from '../controllers/routeArtworkController';

const routeArtworkRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['RouteArtwork'],
        summary: 'Get all RouteArtworks',
        operationId: 'getRouteArtworks',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of RouteArtworks',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'RouteArtwork#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No RouteArtworks found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getRouteArtworks(server, request, reply);
    });

  server.get('/:route_id/:work_id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['RouteArtwork'],
        summary: 'Get RouteArtwork by Route ID and Artwork ID',
        operationId: 'getRouteArtwork',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['route_id', 'artwork_id'],
          properties: {
            route_id: { type: 'number', description: 'Route ID' },
            artwork_id: { type: 'number', description: 'Artwork ID' },
          },
        },
        response: {
          200: {
            description: 'RouteArtwork found',
            content: {
              'application/json': {
                schema: { $ref: 'RouteArtwork#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'RouteArtwork not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { route_id: number; } }>, reply: FastifyReply) => {
      await getRouteArtwork(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['RouteArtwork'],
        summary: 'Add a new RouteArtwork',
        operationId: 'addRouteArtwork',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['routeId', 'artworkId', 'order'],
          properties: {
            routeId: { type: 'number', description: 'Route ID' },
            artworkId: { type: 'number', description: 'Artwork ID' },
            order: { type: 'number', description: 'Order of the artwork in the route' },
          },
          examples: [
            {
              routeId: 1,
              artworkId: 2,
              order: 1,
            },
          ],
        },
        response: {
          201: {
            description: 'RouteArtwork created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'RouteArtwork#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'Route or Artwork not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addRouteArtwork(server, request, reply);
    });

  server.put('/:route_id/:work_id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['RouteArtwork'],
        summary: 'Update RouteArtwork',
        operationId: 'updateRouteArtwork',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['route_id', 'artwork_id'],
          properties: {
            route_id: { type: 'number', description: 'Route ID' },
            artwork_id: { type: 'number', description: 'Artwork ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            order: { type: 'number', description: 'Order of the artwork in the route' },
          },
          examples: [
            {
              order: 2,
            },
          ],
        },
        response: {
          200: {
            description: 'RouteArtwork updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'RouteArtwork#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'RouteArtwork not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { route_id: number; } }>, reply: FastifyReply) => {
      await updateRouteArtwork(server, request, reply);
    });

  server.delete('/:route_id/:work_id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['RouteArtwork'],
        summary: 'Delete RouteArtwork',
        operationId: 'deleteRouteArtwork',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['route_id', 'artwork_id'],
          properties: {
            route_id: { type: 'number', description: 'Route ID' },
            artwork_id: { type: 'number', description: 'Artwork ID' },
          },
        },
        response: {
          200: {
            description: 'RouteArtwork deleted successfully',
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
          404: { description: 'RouteArtwork not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { route_id: number; } }>, reply: FastifyReply) => {
      await deleteRouteArtwork(server, request, reply);
    });
};

export default routeArtworkRoutes;