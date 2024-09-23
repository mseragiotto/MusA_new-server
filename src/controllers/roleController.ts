import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Role } from '../entities/roles';
import { DeepPartial } from 'typeorm';

export const getRoles = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const roles = await server.orm.getRepository(Role).find();
  reply.send(roles);
};

export const addRole = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const role: Role = server.orm.getRepository(Role).create(request.body as DeepPartial<Role>);
  const savedRole = await server.orm.getRepository(Role).save(role);
  reply.send(savedRole);
};

export const updateRole = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { level } = request.params as { level: number };
  const roleRepository = server.orm.getRepository(Role);
  const role = await roleRepository.findOne({ where: { level } });

  if (!role) {
    reply.status(404).send({ message: 'Role not found' });
    return;
  } else {
    roleRepository.merge(role, request.body as DeepPartial<Role>);
    const updatedRole = await roleRepository.save(role);
    reply.send(updatedRole);
  }
};

export const deleteRole = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { level } = request.params as { level: number };
  const result = await server.orm.getRepository(Role).delete(level);

  if (result.affected) {
    reply.send({ message: 'Role deleted successfully' });
  } else {
    reply.status(404).send({ message: 'Role not found' });
  }
};

export const getRole = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { level } = request.params as { level: number };
  const role = await server.orm.getRepository(Role).findOne({ where: { level } });
  reply.send(role);
};