import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { UserVisibility } from '../entities/user_visibility';
import { User } from '../entities/users';
import { Museum } from '../entities/museums';

// Get all museums associatiated to a user
export const getSingleUserVisibility = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.params as { userId: number };
  const userVisibilityRepository = server.orm.getRepository(UserVisibility);

  const records = await userVisibilityRepository.find({
    where: { userId }
  });

  if (!records.length) {
    return reply.status(404).send({ message: 'No museums found for this user' });
  }

  reply.send(records.map(record => record.museumId));
};

// Set a new museum visibility for a user
export const createSingleUserVisibility = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { userId, museumId } = request.body as { userId: number; museumId: number };

  const user = await server.orm.getRepository(User).findOneBy({ id: userId });
  const museum = await server.orm.getRepository(Museum).findOneBy({ id: museumId });

  if (!user || !museum) {
    return reply.status(404).send({ message: 'User or Museum not found' });
  }

  const userVisibilityRepository = server.orm.getRepository(UserVisibility);
  const newUserVisibility = userVisibilityRepository.create({ userId, museumId });

  const savedUserVisibility = await userVisibilityRepository.save(newUserVisibility);
  reply.send(savedUserVisibility);
};

// Modifica un'assegnazione utente-museo
export const editSingleUserVisibility = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const { userId, museumId } = request.body as { userId: number; museumId: number };

  const userVisibilityRepository = server.orm.getRepository(UserVisibility);
  const userVisibility = await userVisibilityRepository.findOneBy({ id });

  if (!userVisibility) {
    return reply.status(404).send({ message: 'UserVisibility not found' });
  }

  const user = await server.orm.getRepository(User).findOneBy({ id: userId });
  const museum = await server.orm.getRepository(Museum).findOneBy({ id: museumId });

  if (!user || !museum) {
    return reply.status(404).send({ message: 'User or Museum not found' });
  }

  userVisibility.userId = userId;
  userVisibility.museumId = museumId;

  const updatedUserVisibility = await userVisibilityRepository.save(userVisibility);
  reply.send(updatedUserVisibility);
};

// Delete a user visibility assignment
export const deleteSingleUserVisibility = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };

  const userVisibilityRepository = server.orm.getRepository(UserVisibility);
  const userVisibility = await userVisibilityRepository.findOneBy({ id });

  if (!userVisibility) {
    return reply.status(404).send({ message: 'UserVisibility not found' });
  }

  await userVisibilityRepository.remove(userVisibility);
  reply.send({ message: 'UserVisibility deleted successfully' });
};
