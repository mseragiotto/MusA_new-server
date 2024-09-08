import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { ChapterArea } from '../entities/chapter_areas';
import { DeepPartial } from 'typeorm';

export const getChapterAreas = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const chapterAreas = await server.orm.getRepository(ChapterArea).find();
    reply.send(chapterAreas);
};

export const addChapterArea = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const chapterArea = await server.orm.getRepository(ChapterArea).save(request.body as DeepPartial<ChapterArea>);
    reply.send(chapterArea);
};

export const updateChapterArea = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const chapterAreaRepository = server.orm.getRepository(ChapterArea);
    const chapterArea = await chapterAreaRepository.findOne({ where: { id } }); 

    if (!chapterArea) {
        reply.status(404).send({ message: 'ChapterArea not found' });
        return;
    } else {
        chapterAreaRepository.merge(chapterArea, request.body as DeepPartial<ChapterArea>);
        const updatedChapterArea = await chapterAreaRepository.save(chapterArea);
        reply.send(updatedChapterArea);
    }

    //const chapterArea = await server.orm.getRepository(ChapterArea).update(id, request.body as DeepPartial<ChapterArea>);
    //reply.send(chapterArea);
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
    const chapterArea = await server.orm.getRepository(ChapterArea).findOne({ where: { id } });
    reply.send(chapterArea);
};