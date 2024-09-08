import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { ArlArtwork } from '../entities/arl_artworks';
import { DeepPartial } from 'typeorm';

export const getArlArtworks = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const arlArtworks = await server.orm.getRepository(ArlArtwork).find();
    reply.send(arlArtworks);
};

export const getArlArtwork = async (server: FastifyInstance, request: FastifyRequest<{ Params: { artwork: number, arl_floor: number } }>, reply: FastifyReply) => {
    const { artwork, arl_floor } = request.params;
    const arlArtwork = await server.orm.getRepository(ArlArtwork).findOne({ where: { artwork, arl_floor } });
    if (arlArtwork) {
        reply.send(arlArtwork);
    } else {
        reply.status(404).send({ message: 'ArlArtwork not found' });
    }
};

export const addArlArtwork = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
    const arlArtwork = await server.orm.getRepository(ArlArtwork).save(request.body as DeepPartial<ArlArtwork>);
    reply.send(arlArtwork);
};

export const updateArlArtwork = async (server: FastifyInstance, request: FastifyRequest<{ Params: { artwork: number, arl_floor: number } }>, reply: FastifyReply) => {
    const { artwork, arl_floor } = request.params;
    const arlArtworkRepository = server.orm.getRepository(ArlArtwork);
    const arlArtwork = await arlArtworkRepository.findOne({ where: { artwork, arl_floor } });

    if (arlArtwork) {
        arlArtworkRepository.merge(arlArtwork, request.body as DeepPartial<ArlArtwork>);
        const updatedArlArtwork = await arlArtworkRepository.save(arlArtwork);
        reply.send(updatedArlArtwork);
    } else {
        reply.status(404).send({ message: 'ArlArtwork not found' });
    }
};

export const deleteArlArtwork = async (server: FastifyInstance, request: FastifyRequest<{ Params: { artwork: number, arl_floor: number } }>, reply: FastifyReply) => {
    const { artwork, arl_floor } = request.params;
    const result = await server.orm.getRepository(ArlArtwork).delete({ artwork, arl_floor });

    if (result.affected) {
        reply.send({ message: 'ArlArtwork deleted successfully' });
    } else {
        reply.status(404).send({ message: 'ArlArtwork not found' });
    }
};
