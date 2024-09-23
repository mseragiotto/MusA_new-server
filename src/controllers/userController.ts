import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { User } from '../entities/users';
import { DeepPartial } from 'typeorm';

export const getUsers = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const users = await server.orm.getRepository(User).find();
  reply.send(users);
};

export const addUser = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const user: User = server.orm.getRepository(User).create(request.body as DeepPartial<User>);
  const savedUser = await server.orm.getRepository(User).save(user);
  reply.send(savedUser);
};

export const updateUser = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const userRepository = server.orm.getRepository(User);
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    reply.status(404).send({ message: 'User not found' });
    return;
  } else {
    userRepository.merge(user, request.body as DeepPartial<User>);
    const updatedUser = await userRepository.save(user);
    reply.send(updatedUser);
  }
};

export const deleteUser = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(User).delete(id);

  if (result.affected) {
    reply.send({ message: 'User deleted successfully' });
  } else {
    reply.status(404).send({ message: 'User not found' });
  }
};

export const getUser = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const user = await server.orm.getRepository(User).findOne({ where: { id } });
  reply.send(user);
};