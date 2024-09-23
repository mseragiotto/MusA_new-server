import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Chapter } from '../entities/chapters';
import { DeepPartial } from 'typeorm';

export const getChapters = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const chapters = await server.orm.getRepository(Chapter).find();
  reply.send(chapters);
};

export const addChapter = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const chapter: Chapter = server.orm.getRepository(Chapter).create(request.body as DeepPartial<Chapter>);
  const savedChapter = await server.orm.getRepository(Chapter).save(chapter);
  reply.send(savedChapter);
};

export const updateChapter = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const chapterRepository = server.orm.getRepository(Chapter);
  const chapter = await chapterRepository.findOne({ where: { id } });

  if (!chapter) {
    reply.status(404).send({ message: 'Chapter not found' });
    return;
  } else {
    chapterRepository.merge(chapter, request.body as DeepPartial<Chapter>);
    const updatedChapter = await chapterRepository.save(chapter);
    reply.send(updatedChapter);
  }
};

export const deleteChapter = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(Chapter).delete(id);

  if (result.affected) {
    reply.send({ message: 'Chapter deleted successfully' });
  } else {
    reply.status(404).send({ message: 'Chapter not found' });
  }
};

export const getChapter = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const chapter = await server.orm.getRepository(Chapter).findOne({ where: { id } });
  reply.send(chapter);
};