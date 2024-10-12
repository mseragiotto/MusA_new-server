import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { User } from '../entities/users';
import { DeepPartial } from 'typeorm';
import { Role } from '../entities/roles';

export const getUsers = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const users = await server.orm.getRepository(User).find({ relations: ['role'] });
  if (!users) {
    return reply.status(404).send({ message: 'No Users found' });
  }
  reply.send(users);
};

// Internal method to create an user with clear password (do not use in production)
export const addUser = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { roleLevel, username, password } = request.body as { roleLevel: Role; username: string; password: string };
  const userRepository = server.orm.getRepository(User);

  // Verify if the user already exists
  const existingUser = await userRepository.findOne({ where: { username } });
  if (existingUser) {
    return reply.status(400).send({ message: 'Username already taken' });
  }

  // Check if the role exists
  const role = await server.orm.getRepository(Role).findOne({ where: { level: roleLevel.level } });
  if (!role) {
    return reply.status(404).send({ message: 'Provided Role not found' });
  }

  const user: User = server.orm.getRepository(User).create({ role, username, password });
  const savedUser = await server.orm.getRepository(User).save(user);
  reply.send(savedUser);
};

// Internal method to update an user with clear password (do not use in production)
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
  const user = await server.orm.getRepository(User).findOne({ where: { id }, relations: ['role'] });
  if (!user) {
    return reply.status(404).send({ message: 'User not found' });
  }
  reply.send(user);
};