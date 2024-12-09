import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getArtworks, getArtwork, addArtwork, updateArtwork, deleteArtwork } from '../controllers/artworkController';

const artworkRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Artwork'],
        summary: 'Get all artworks',
        operationId: 'getArtworks',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: 'Artwork#',
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'No Artworks found',
          },
        },
      }, 
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getArtworks(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Artwork'],
        summary: 'Get artwork by id',
        operationId: 'getArtwork',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'Artwork#',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Artwork not found',
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getArtwork(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Artwork'],
        summary: 'Add artwork',
        operationId: 'addArtwork',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          properties: {
            author: { type: 'number' },
            museum: { type: 'number' },
            main_image: { type: 'number' },
            thumbnail: { type: 'number' },
            macroareas_image: { type: 'number' },
            floor: { type: 'number' },
            name: { type: 'string' },
            width: { type: 'number' },
            threedimensionalmodel: { type: 'string' },
            published: { type: 'boolean' },
          },
          examples: [{
            author: 12,
            museum: 4,
            main_image: 3,
            thumbnail: 7,
            macroareas_image: 8,
            floor: 12,
            name: 'Quadro 27',
            width: 13.0,
            threedimensionalmodel: 'base64string',
            published: true,
          }]
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'Artwork#',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Author, Museum, Image, Floor or Artwork not found',
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addArtwork(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Artwork'],
        summary: 'Update artwork',
        operationId: 'updateArtwork',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        body: {
          type: 'object',
          properties: {
            author: { type: 'number' },
            museum: { type: 'number' },
            main_image: { type: 'number' },
            thumbnail: { type: 'number' },
            macroareas_image: { type: 'number' },
            floor: { type: 'number' },
            name: { type: 'string' },
            width: { type: 'number' },
            threedimensionalmodel: { type: 'string' },
            published: { type: 'boolean' },
          },
          examples: [{
            author: 12,
            museum: 4,
            main_image: 9,
            thumbnail: 7,
            macroareas_image: 8,
            floor: 12,
            name: 'Quadro 28',
            width: 13.0,
            threedimensionalmodel: 'base64string',
            published: false,
          }]
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'Artwork#',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Author, Museum, Image, Floor or Artwork not found',
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await updateArtwork(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Artwork'],
        summary: 'Delete artwork',
        operationId: 'deleteArtwork',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        response: {
          200: {
            description: 'Artwork deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
          },
          404: {
            description: 'Artwork not found',
          },
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await deleteArtwork(server, request, reply);
    });
};

export default artworkRoutes;
