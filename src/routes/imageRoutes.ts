import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getImages, getImage, addImage, updateImage, deleteImage } from '../controllers/imageController';

const imageRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Image'],
        summary: 'Get all Images',
        operationId: 'getImages',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: 'Image#' },
                },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'No Images found' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getImages(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Image'],
        summary: 'Get Image by id',
        operationId: 'getImage',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'ID of the image' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Image found',
            content: {
              'application/json': {
                schema: { $ref: 'Image#' },
              },
            },
          },
          401: { description: 'Unauthorized' },
          404: { description: 'Image not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await getImage(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Image'],
        summary: 'Add a new Image',
        operationId: 'addImage',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['url', 'description'],
          properties: {
            url: { type: 'string', description: 'URL of the image' },
            description: { type: 'string', description: 'Description of the image' },
          },
          examples: [{
            url: 'http://example.com/image.jpg',
            description: 'An example image',
          }],
        },
        response: {
          201: {
            description: 'Image created successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Image#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addImage(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Image'],
        summary: 'Update Image',
        operationId: 'updateImage',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'ID of the image to update' },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            url: { type: 'string', description: 'URL of the image' },
            description: { type: 'string', description: 'Description of the image' },
          },
          examples: [{
            url: 'http://example.com/updated_image.jpg',
            description: 'An updated image description',
          }],
        },
        response: {
          200: {
            description: 'Image updated successfully',
            content: {
              'application/json': {
                schema: { $ref: 'Image#' },
              },
            },
          },
          400: { description: 'Invalid input' },
          401: { description: 'Unauthorized' },
          404: { description: 'Image not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await updateImage(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Image'],
        summary: 'Delete Image',
        operationId: 'deleteImage',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'ID of the image to delete' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Image deleted successfully',
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
          404: { description: 'Image not found' },
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await deleteImage(server, request, reply);
    });
};

export default imageRoutes;