import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { uploadToS3 } from '../utils/uploadModule';
import { addImage } from './imageController'; 

export const uploadImage = async (server: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const data = await request.file();
  if (!data || !request.body) {
    return reply.status(400).send({ message: 'No file uploaded' });
  }

  const { mimetype, filename } = data;
  const fileBuffer = await data.toBuffer();

  try {
    // Upload file to S3
    const s3Url = await uploadToS3(fileBuffer, filename, mimetype);

    // Create a mock request object to pass to addImage
    const mockRequest = {
      body: { url: s3Url, filename },
    } as FastifyRequest;

    // Call addImage controller
    await addImage(server, mockRequest, reply);
  } catch (err) {
    console.error(err);
    reply.status(500).send({ message: 'Failed to upload image' });
  }
};