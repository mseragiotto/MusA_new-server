import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { Graph } from '../entities/graphs';
import { DeepPartial } from 'typeorm';

export const getGraphs = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const graphs = await server.orm.getRepository(Graph).find();
  reply.send(graphs);
};

export const addGraph = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const graph: Graph = server.orm.getRepository(Graph).create(request.body as DeepPartial<Graph>);
  const savedGraph = await server.orm.getRepository(Graph).save(graph);
  reply.send(savedGraph);
};

export const updateGraph = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const graphRepository = server.orm.getRepository(Graph);
  const graph = await graphRepository.findOne({ where: { id } });

  if (!graph) {
    reply.status(404).send({ message: 'Graph not found' });
    return;
  } else {
    graphRepository.merge(graph, request.body as DeepPartial<Graph>);
    const updatedGraph = await graphRepository.save(graph);
    reply.send(updatedGraph);
  }
};

export const deleteGraph = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const result = await server.orm.getRepository(Graph).delete(id);

  if (result.affected) {
    reply.send({ message: 'Graph deleted successfully' });
  } else {
    reply.status(404).send({ message: 'Graph not found' });
  }
};

export const getGraph = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: number };
  const graph = await server.orm.getRepository(Graph).findOne({ where: { id } });
  reply.send(graph);
};