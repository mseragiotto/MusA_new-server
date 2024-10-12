import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { User } from '../entities/users';
import { Role } from '../entities/roles';

export const register = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const userRepository = server.orm.getRepository(User);
  const { username, password, role } = request.body as { username: string, password: string, role: Role };

  // Verify if the user already exists
  const existingUser = await userRepository.findOne({ where: { username } });
  if (existingUser) {
    return reply.status(400).send({ message: 'Username already taken' });
  }

  // Check if the role exists
  const roleRepository = server.orm.getRepository(Role);
  const existingRole = await roleRepository.findOne({ where: { level: role.level } });
  if (!existingRole) {
    return reply.status(400).send({ message: 'User role does not exist' });
  }

  // New user creation
  const newUser = new User();
  newUser.username = username;
  newUser.role = role;
  await newUser.setPassword(password);

  const savedUser = await userRepository.save(newUser);
  reply.send({ id: savedUser.id, username: savedUser.username, role: savedUser.role });
};

export const login = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const userRepository = server.orm.getRepository(User);
  const { username, password } = request.body as { username: string, password: string };

  // Check if the user exists
  const user = await userRepository.findOne({ where: { username } });
  if (!user) {
    return reply.status(401).send({ message: 'Invalid username or password' });
  }

  // Check if the password is correct
  const isValidPassword = await user.checkPassword(password);
  if (!isValidPassword) {
    return reply.status(401).send({ message: 'Invalid username or password' });
  }

  // JWT token generation
  const token = await reply.jwtSign({ id: user.id, username: user.username, role: user.role }, { expiresIn: '1h' });
  reply.send({ token });
};

// Method to change the password of an user (requires the user to be logged in)
export const changePassword = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const userRepository = server.orm.getRepository(User);
  const { password, newPassword } = request.body as { password: string, newPassword: string };

  // Get the token from the headers
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.status(401).send({ message: 'Authorization header is missing' });
  }
  const token = authHeader.split(' ')[1];

  // Decode the JWT token to get the username
  const decodedToken = server.jwt.decode<{ username: string }>(token);
  if (!decodedToken) {
    return reply.status(401).send({ message: 'Invalid token' });
  }

  const user = await userRepository.findOne({ where: { username: decodedToken.username } });
  if (!user) {
    return reply.status(401).send({ message: 'User not found' });
  }

  // Check if the password is correct
  const isValidPassword = await user.checkPassword(password);
  if (!isValidPassword) {
    return reply.status(401).send({ message: 'Invalid password' });
  }

  // Update the password
  await user.setPassword(newPassword);
  await userRepository.save(user);
  reply.send({ message: 'Password updated successfully' });
};