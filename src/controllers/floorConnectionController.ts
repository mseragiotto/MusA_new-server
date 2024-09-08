import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { FloorsConnection } from '../entities/floors_connections';
import { DeepPartial } from 'typeorm';

export const getFloorsConnections = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const floorsConnections = await server.orm.getRepository(FloorsConnection).find();
    reply.send(floorsConnections);
};

export const addFloorsConnection = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const floorsConnection = await server.orm.getRepository(FloorsConnection).save(request.body as DeepPartial<FloorsConnection>);
    reply.send(floorsConnection);
};

export const updateFloorsConnection = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const floorsConnectionRepository = server.orm.getRepository(FloorsConnection);
    const floorsConnection = await floorsConnectionRepository.findOne({ where: { id } });

    if (!floorsConnection) {
        reply.status(404).send({ message: 'FloorsConnection not found' });
        return;
    } else {
        floorsConnectionRepository.merge(floorsConnection, request.body as DeepPartial<FloorsConnection>);
        const updatedFloorsConnection = await floorsConnectionRepository.save(floorsConnection);
        reply.send(updatedFloorsConnection);
    }
    //const floorsConnection = await server.orm.getRepository(FloorsConnection).update(id, request.body as DeepPartial<FloorsConnection>);
    //reply.send(floorsConnection);
};

export const deleteFloorsConnection = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const result = await server.orm.getRepository(FloorsConnection).delete(id);

    if (result.affected) {
        reply.send({ message: 'FloorsConnection deleted successfully' });
    } else {
        reply.status(404).send({ message: 'FloorsConnection not found' });
    }
};

export const getFloorsConnection = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };
    const floorsConnection = await server.orm.getRepository(FloorsConnection).findOne({ where: { id } });
    reply.send(floorsConnection);
};