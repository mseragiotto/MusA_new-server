import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getAudios, getAudio, addAudio, updateAudio, deleteAudio } from '../controllers/audioController';

const audioRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Audio'],
        summary: 'Get all audios',
        operationId: 'getAudios',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: 'Audio#'
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'No Audios found'
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getAudios(server, request, reply);
    });

  server.get('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Audio'],
        summary: 'Get audio by id',
        operationId: 'getAudio',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' }
          }
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'Audio#'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Audio not found'
          }
        }
      }
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await getAudio(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Audio'],
        summary: 'Add audio',
        operationId: 'addAudio',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          properties: {
            base64: { type: 'string' }
          },
          examples: [{
            base64: 'base64string'
          }]
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'Audio#'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Error adding audio'
          }
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addAudio(server, request, reply);
    });

  server.put('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Audio'],
        summary: 'Update audio',
        operationId: 'updateAudio',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' }
          }
        },
        body: {
          type: 'object',
          properties: {
            base64: { type: 'string' }
          },
          examples: [{
            base64: 'base64string'
          }]
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'Audio#'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Audio not found'
          }
        }
      }
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await updateAudio(server, request, reply);
    });

  server.delete('/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Audio'],
        summary: 'Delete audio',
        operationId: 'deleteAudio',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' }
          }
        },
        response: {
          200: {
            description: 'Audio deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Audio not found'
          }
        },
      },
    },
    async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
      await deleteAudio(server, request, reply);
    });
};

export default audioRoutes;