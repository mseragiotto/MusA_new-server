import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getArlFloors, getArlFloor, addArlFloor, updateArlFloor, deleteArlFloor } from '../controllers/arlFloorController';

const arlFloorRoutes: FastifyPluginAsync = async (server) => {
  server.get('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ArlFloor'],
        summary: 'Get all arl floors',
        operationId: 'getArlFloors',
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: 'ArlFloor#'
                  }
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'No ArlFloors found'
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getArlFloors(server, request, reply);
    });

  server.get('/:floor',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ArlFloor'],
        summary: 'Get arl floor',
        operationId: 'getArlFloor',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            floor: { type: 'number' }
          }
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'ArlFloor#'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'ArlFloor not found'
          }
        }
      }

    },
    async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
      await getArlFloor(server, request, reply);
    });

  server.post('/',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ArlFloor'],
        summary: 'Add arl floor',
        operationId: 'addArlFloor',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          properties: {
            museum: { type: 'number' },
            floor: { type: 'number' },
            name: { type: 'string' }
          },
          examples: [{
            museum: 18,
            floor: 12,
            name: 'Piano Terra'
          }]
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'ArlFloor#'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Museum or Floor not found'
          }
        }
      }
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      await addArlFloor(server, request, reply);
    });

  server.put('/:floor',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ArlFloor'],
        summary: 'Update arl floor',
        operationId: 'updateArlFloor',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            floor: { type: 'number' }
          }
        },
        body: {
          type: 'object',
          properties: {
            museumId: { type: 'number' },
            floorId: { type: 'number' },
            name: { type: 'string' }
          },
          examples: [{
            museum: 18,
            floor: 12,
            name: 'Piano zero'
          }]
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: 'ArlFloor#'
                }
              }
            }
          },
          401: {
            description: 'Unauthorized'
          },
          404: {
            description: 'Museum or Floor not found'
          }
        }
      }
    },
    async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
      await updateArlFloor(server, request, reply);
    });

  server.delete('/:floor',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['ArlFloor'],
        summary: 'Delete arl floor',
        operationId: 'deleteArlFloor',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            floor: { type: 'number' }
          }
        },
        response: {
          200: {
            description: 'ArlFloor deleted successfully',
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
            description: 'ArlFloor not found'
          }
        }
      }
    },
    async (request: FastifyRequest<{ Params: { floor: number; } }>, reply: FastifyReply) => {
      await deleteArlFloor(server, request, reply);
    });
};

export default arlFloorRoutes;