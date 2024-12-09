import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getMuseums, getMuseum, addMuseum, updateMuseum, deleteMuseum } from '../controllers/museumController';

const museumRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Museum'],
        summary: 'Get all Museums',
        operationId: 'getMuseums',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'List of Museums',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'Museum#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No Museums found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getMuseums(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Museum'],
        summary: 'Get Museum by ID',
        operationId: 'getMuseum',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Museum ID' },
          },
        },
        response: {
          200: {
            description: 'Museum found',
            content: {
              'application/json': {
                schema: { $ref: 'Museum#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Museum not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getMuseum(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Museum'],
        summary: 'Add a new Museum',
        operationId: 'addMuseum',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: [
            'name',
            'latitude',
            'longitude',
            'address',
            'website',
            'geolocked',
            'ar_iconId',
            'logoId',
            'backgroundimageId',
            'arl_file',
          ],
          properties: {
            name: { type: 'string', description: 'Name of the Museum' },
            latitude: { type: 'number', description: 'Latitude coordinate' },
            longitude: { type: 'number', description: 'Longitude coordinate' },
            address: { type: 'string', description: 'Address of the Museum' },
            website: { type: 'string', description: 'Website URL' },
            geolocked: { type: 'boolean', description: 'Is geolocked?' },
            ar_iconId: { type: 'number', description: 'ID of the AR icon image' },
            logoId: { type: 'number', description: 'ID of the logo image' },
            backgroundimageId: { type: 'number', description: 'ID of the background image' },
            arl_file: { type: 'string', description: 'ARL file content' },
          },
          examples: [
            {
              name: 'Museum Example',
              latitude: 40.7128,
              longitude: -74.0060,
              address: '123 Museum St.',
              website: 'https://www.examplemuseum.org',
              geolocked: true,
              ar_iconId: 1,
              logoId: 2,
              backgroundimageId: 3,
              arl_file: 'Sample ARL file content',
            },
          ],
        },
        response: {
          201: {
            description: 'Museum created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Museum#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'Provided image attributes not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addMuseum(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Museum'],
        summary: 'Update Museum',
        operationId: 'updateMuseum',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Museum ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Name of the Museum' },
            latitude: { type: 'number', description: 'Latitude coordinate' },
            longitude: { type: 'number', description: 'Longitude coordinate' },
            address: { type: 'string', description: 'Address of the Museum' },
            website: { type: 'string', description: 'Website URL' },
            geolocked: { type: 'boolean', description: 'Is geolocked?' },
            ar_iconId: { type: 'number', description: 'ID of the AR icon image' },
            logoId: { type: 'number', description: 'ID of the logo image' },
            backgroundimageId: { type: 'number', description: 'ID of the background image' },
            arl_file: { type: 'string', description: 'ARL file content' },
          },
          examples: [
            {
              name: 'Updated Museum Name',
              latitude: 37.7749,
              longitude: -122.4194,
              address: '456 Updated Address',
              website: 'https://www.updatedmuseum.org',
              geolocked: false,
              ar_iconId: 4,
              logoId: 5,
              backgroundimageId: 6,
              arl_file: 'Updated ARL file content',
            },
          ],
        },
        response: {
          200: {
            description: 'Museum updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Museum#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: {
            description: 'Museum not found or provided image attributes not found',
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await updateMuseum(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Museum'],
        summary: 'Delete Museum',
        operationId: 'deleteMuseum',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'number', description: 'Museum ID' },
          },
        },
        response: {
          200: {
            description: 'Museum deleted successfully',
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
          404: { description: 'Museum not found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await deleteMuseum(server, request, reply);
    });
};

export default museumRoutes;