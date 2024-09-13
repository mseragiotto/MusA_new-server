import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { DeepPartial } from 'typeorm';
import { User } from '../entities/users';
import { Role } from '../entities/roles';

export const register = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const userRepository = server.orm.getRepository(User);
  const { username, password, role } = request.body as { username: string, password: string, role: Role };

  // Verify if the user already exists
  const existingUser = await userRepository.findOne({ where: { username } });
  if (existingUser) {
    return reply.status(400).send({ message: "Username already taken" });
  }

  // New user creation
  const newUser = new User();
  newUser.username = username;
  newUser.role = role;
  await newUser.setPassword(password);

  const savedUser = await userRepository.save(newUser);
  reply.send({ id: savedUser.id, username: savedUser.username });
};

export const login = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const userRepository = server.orm.getRepository(User);
  const { username, password } = request.body as { username: string, password: string };

  // Verifica se l'utente esiste
  const user = await userRepository.findOne({ where: { username } });
  if (!user) {
    return reply.status(401).send({ message: "Invalid username or password" });
  }

  // Verifica la password
  const isValidPassword = await user.checkPassword(password);
  if (!isValidPassword) {
    return reply.status(401).send({ message: "Invalid username or password" });
  }

  // Genera il token JWT
  const token = await reply.jwtSign({ id: user.id, username: user.username, role: user.role }, { expiresIn: '1h' });
  reply.send({ token });
};
