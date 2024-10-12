import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { Author } from '../entities/authors';
import { Image } from '../entities/images';

export const getAuthors = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const authors = await server.orm.getRepository(Author).find({ relations: ['image'] });
  if (!authors) {
    return reply.status(404).send({ message: 'No Authors found' });
  }
  reply.send(authors);
};

export const addAuthor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { name, bio, imageId, published } = request.body as { name: string; bio: string; imageId: number, published: boolean };

  const image = await server.orm.getRepository(Image).findOne({ where: { id: imageId } });
  if (!image) {
    return reply.status(404).send({ message: 'provided Image id not found' });
  }

  const author: Author = server.orm.getRepository(Author).create({ name, bio, image, published });
  const savedAuthor = await server.orm.getRepository(Author).save(author);
  reply.send(savedAuthor);
};

export const updateAuthor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { name, bio, imageId, published } = request.body as { name: string; bio: string; imageId: number, published: boolean };

  const authorRepository = server.orm.getRepository(Author);
  const author = await authorRepository.findOne({ where: { id } });

  if (!author) {
    return reply.status(404).send({ message: 'Author not found' });
  } else {
    if (imageId) {
      const image = await server.orm.getRepository(Image).findOne({ where: { id: imageId } });
      if (!image) {
        return reply.status(404).send({ message: 'provided Image id not found' });
      }
      author.image = image;
    }
    authorRepository.merge(author, { name, bio, published });
    const updatedAuthor = await authorRepository.save(author);
    reply.send(updatedAuthor);
  }
};

export const deleteAuthor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(Author).delete(id);

  if (result.affected) {
    reply.send({ message: 'Author deleted successfully' });
  } else {
    reply.status(404).send({ message: 'Author not found' });
  }
};

export const getAuthor = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const author = await server.orm.getRepository(Author).findOne({ where: { id }, relations: ['image'] });
  if (author) {
    reply.send(author);
  } else {
    reply.status(404).send({ message: 'Author not found' });
  }
};