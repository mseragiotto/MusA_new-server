import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// Amazon S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Upload file to S3
export const uploadToS3 = async (fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> => {
  const bucketName = process.env.S3_BUCKET_NAME!;
  // Generate an unique file name using UUID
  const uniqueFileName = `${uuidv4()}-${fileName}`; 

  const params = {
    Bucket: bucketName,
    Key: uniqueFileName,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
  } catch (err) {
    console.error('Error uploading to S3:', err);
    throw new Error('Failed to upload file to S3');
  }
};