import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { ChapterArea } from '../entities/chapter_areas';
import { Chapter } from '../entities/chapters';
import { Macroarea } from '../entities/macroareas';

export const getChapterAreas = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const chapterAreas = await server.orm.getRepository(ChapterArea).find({ relations: ['chapter', 'macroarea'] });
  if (!chapterAreas) {
    return reply.status(404).send({ message: 'No ChapterAreas found' });
  }
  reply.send(chapterAreas);
};

export const addChapterArea = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { chapterId, macroareaId } = request.body as { chapterId: number; macroareaId: number };

  const chapter = await server.orm.getRepository(Chapter).findOne({ where: { id: chapterId } });
  const macroarea = await server.orm.getRepository(Macroarea).findOne({ where: { id: macroareaId } });

  if (!chapter || !macroarea) {
    return reply.status(404).send({ message: 'Chapter or Macroarea not found' });
  }

  const chapterArea: ChapterArea = server.orm.getRepository(ChapterArea).create({ chapter, macroarea });
  const savedChapterArea = await server.orm.getRepository(ChapterArea).save(chapterArea);
  reply.send(savedChapterArea);
};

export const updateChapterArea = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { chapterId, macroareaId } = request.body as { chapterId: number; macroareaId: number };

  const chapterAreaRepository = server.orm.getRepository(ChapterArea);
  const chapterArea = await chapterAreaRepository.findOne({ where: { id } });

  if (!chapterArea) {
    return reply.status(404).send({ message: 'ChapterArea not found' });
  } else {
    if (chapterId) {
      const chapter = await server.orm.getRepository(Chapter).findOne({ where: { id: chapterId } });
      if (!chapter) {
        return reply.status(404).send({ message: 'provided Chapter id not found' });
      }
      chapterArea.chapter = chapter;
    }

    if (macroareaId) {
      const macroarea = await server.orm.getRepository(Macroarea).findOne({ where: { id: macroareaId } });
      if (!macroarea) {
        return reply.status(404).send({ message: 'provided Macroarea id not found' });
      }
      chapterArea.macroarea = macroarea;
    }

    const updatedChapterArea = await chapterAreaRepository.save(chapterArea);
    reply.send(updatedChapterArea);
  }
};

export const deleteChapterArea = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(ChapterArea).delete(id);
    
  if (result.affected) {
    reply.send({ message: 'ChapterArea deleted successfully' });
  } else {
    reply.status(404).send({ message: 'ChapterArea not found' });
  }
};

export const getChapterArea = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const chapterArea = await server.orm.getRepository(ChapterArea).findOne({ where: { id }, relations: ['chapter', 'macroarea'] });
  if (chapterArea) {
    reply.send(chapterArea);
  } else {
    reply.status(404).send({ message: 'ChapterArea not found' });
  }
};