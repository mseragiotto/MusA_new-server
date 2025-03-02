import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { uploadImage } from '../controllers/uploadController';

const uploadRoutes: FastifyPluginAsync = async (server) => {
  server.post('/image',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Upload'],
        summary: 'Upload an image',
        operationId: 'uploadImage',
        security: [{ bearerAuth: [] }],
        consumes: ['multipart/form-data'],
        body: {
          type: 'object',
          properties: {
            file: { 
              type: 'object', 
              //format: 'binary'
              additionalProperties: true,
            },
          },
          required: ['file'],
        },
        response: {
          200: {
            description: 'Image uploaded successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    image: { $ref: 'Image#' },
                  },
                },
              },
            },
          },
          400: { description: 'No image uploaded' },
          500: { description: 'Failed to upload image' },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await uploadImage(server, request, reply);
    });
};

export default uploadRoutes;