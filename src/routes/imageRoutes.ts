import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { getImages, getImage, addImage, updateImage, deleteImage } from '../controllers/imageController';

const imageRoutes: FastifyPluginAsync = async (server) => {
  server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await getImages(server, request, reply);
  });
  server.get('/:id', async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await getImage(server, request, reply);
  });
  server.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await addImage(server, request, reply);
  });
  server.put('/:id', async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await updateImage(server, request, reply);
  });
  server.delete('/:id', async (request: FastifyRequest<{ Params: { id: number; } }>, reply: FastifyReply) => {
    await deleteImage(server, request, reply);
  });
};

export default imageRoutes;