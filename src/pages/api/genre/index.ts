import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/utils/db';
import { Genre } from '@/models/genre';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const client = await clientPromise;
  const collection = client.db('catalog').collection('genres');
  try {
    let result;
    if (req.method === 'GET') {
      result = await collection.find({}).toArray();
    } else if (req.method === 'POST') {
      // TODO: add validation
      const { name } = req.body;
      const item = await collection.insertOne(Genre.toServer(name));
      result = Genre.fromServer({ _id: item.insertedId.toString(), name });
    }
    res.status(200).json(result);
  } catch (e: unknown) {
    console.error(e);
    client.close();
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
