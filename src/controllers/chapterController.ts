import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Chapter } from '../entities/chapters';
import { Image } from '../entities/images';
import { Artwork } from '../entities/artworks';
import { Audio } from '../entities/audios';

export const getChapters = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const chapters = await server.orm.getRepository(Chapter).find({ relations: ['overlay_image', 'artwork', 'touch_area', 'audio'] });
  if (!chapters) {
    return reply.status(404).send({ message: 'No Chapters found' });
  }
  reply.send(chapters);
};

export const addChapter = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { title, text, number, overlay_imageId, artworkId, touch_areaId, audioId, published } = request.body as
    { title: string; text: string; number: number; overlay_imageId: number; artworkId: number; touch_areaId: number; audioId: number; published: boolean };

  const overlay_image = await server.orm.getRepository(Image).findOne({ where: { id: overlay_imageId } });
  const artwork = await server.orm.getRepository(Artwork).findOne({ where: { id: artworkId } });
  const touch_area = await server.orm.getRepository(Image).findOne({ where: { id: touch_areaId } });
  const audio = await server.orm.getRepository(Audio).findOne({ where: { id: audioId } });

  if (!overlay_image || !artwork || !touch_area || !audio) {
    return reply.status(404).send({ message: 'Image, Artwork, TouchArea or Audio not found' });
  }

  const chapter: Chapter = server.orm.getRepository(Chapter).create({ title, text, number, overlay_image, artwork, touch_area, audio, published });
  const savedChapter = await server.orm.getRepository(Chapter).save(chapter);
  reply.send(savedChapter);
};

export const updateChapter = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { title, text, number, overlay_imageId, artworkId, touch_areaId, audioId, published } = request.body as
    { title: string; text: string; number: number; overlay_imageId: number; artworkId: number; touch_areaId: number; audioId: number; published: boolean };

  const chapterRepository = server.orm.getRepository(Chapter);
  const chapter = await chapterRepository.findOne({ where: { id } });

  if (!chapter) {
    return reply.status(404).send({ message: 'Chapter not found' });
  } else {
    if (overlay_imageId) {
      const overlay_image = await server.orm.getRepository(Image).findOne({ where: { id: overlay_imageId } });
      if (!overlay_image) {
        return reply.status(404).send({ message: 'provided Image id not found' });
      }
      chapter.overlay_image = overlay_image;
    }

    if (artworkId) {
      const artwork = await server.orm.getRepository(Artwork).findOne({ where: { id: artworkId } });
      if (!artwork) {
        return reply.status(404).send({ message: 'provided Artwork id not found' });
      }
      chapter.artwork = artwork;
    }

    if (touch_areaId) {
      const touch_area = await server.orm.getRepository(Image).findOne({ where: { id: touch_areaId } });
      if (!touch_area) {
        return reply.status(404).send({ message: 'provided TouchArea id not found' });
      }
      chapter.touch_area = touch_area;
    }

    if (audioId) {
      const audio = await server.orm.getRepository(Audio).findOne({ where: { id: audioId } });
      if (!audio) {
        return reply.status(404).send({ message: 'provided Audio id not found' });
      }
      chapter.audio = audio;
    }

    chapterRepository.merge(chapter, { title, text, number, published });
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
  const chapter = await server.orm.getRepository(Chapter).findOne({ where: { id }, relations: ['overlay_image', 'artwork', 'touch_area', 'audio'] });
  if (chapter) {
    reply.send(chapter);
  } else {
    reply.status(404).send({ message: 'Chapter not found' });
  }
};