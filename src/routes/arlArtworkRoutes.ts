import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getArlArtworks, getArlArtwork, addArlArtwork, updateArlArtwork, deleteArlArtwork } from '../controllers/arlArtworkController';

const arlArtworkRoutes: FastifyPluginAsync = async (server) => {

  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ArlArtwork'],
        summary: 'Get all arl artworks',
        operationId: 'getArlArtworks',
        security: [{ 'bearerAuth': [] }],
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: 'ArlArtwork#'
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'No ArlArtworks found'
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getArlArtworks(server, request, reply);
    });

  server.get('/:artwork/:arl_floor',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ArlArtwork'],
        summary: 'Get arl artwork',
        operationId: 'getArlArtwork',
        security: [{ 'bearerAuth': [] }],
        params: {
          type: 'object',
          properties: {
            artwork: { type: 'number' },
            arl_floor: { type: 'number' }
          }
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'ArlArtwork#'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'ArlArtwork not found'
          }
        }
      }
    },
    async (request: FastifyRequest<{ Params: { artwork: number; arl_floor: number; } }>, reply: FastifyReply) => {
      await getArlArtwork(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ArlArtwork'],
        summary: 'Add arl artwork',
        operationId: 'addArlArtwork',
        security: [{ 'bearerAuth': [] }],
        body: {
          type: 'object',
          properties: {
            artwork: { type: 'number' },
            arl_floor: { type: 'number' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
            height: { type: 'number' }
          }
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'ArlArtwork#'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Provided Artwork or ArlFloor not found'
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addArlArtwork(server, request, reply);
    });

  server.put('/:artwork/:arl_floor',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ArlArtwork'],
        summary: 'Update arl artwork',
        operationId: 'updateArlArtwork',
        security: [{ 'bearerAuth': [] }],
        params: {
          type: 'object',
          properties: {
            artwork: { type: 'number' },
            arl_floor: { type: 'number' }
          }
        },
        body: {
          type: 'object',
          properties: {
            latitude: { type: 'number' },
            longitude: { type: 'number' },
            height: { type: 'number' }
          }
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'ArlArtwork#'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'ArlArtwork not found'
          }
        }
      }
    },
    async (request: FastifyRequest<{ Params: { artwork: number; arl_floor: number; } }>, reply: FastifyReply) => {
      await updateArlArtwork(server, request, reply);
    });

  server.delete('/:artwork/:arl_floor',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ArlArtwork'],
        summary: 'Delete arl artwork',
        operationId: 'deleteArlArtwork',
        security: [{ 'bearerAuth': [] }],
        params: {
          type: 'object',
          properties: {
            artwork: { type: 'number' },
            arl_floor: { type: 'number' }
          }
        },
        response: {
          200: {
            description: 'ArlArtwork deleted successfully'
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'ArlArtwork not found'
          }
        }
      }
    },
    async (request: FastifyRequest<{ Params: { artwork: number; arl_floor: number; } }>, reply: FastifyReply) => {
      await deleteArlArtwork(server, request, reply);
    });
};

export default arlArtworkRoutes;