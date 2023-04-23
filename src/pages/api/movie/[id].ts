import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/utils/db';
import { Movie } from '@/models/movie';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const client = await clientPromise;
  const collection = client.db('catalog').collection('movies');
  // eslint-disable-next-line no-underscore-dangle
  const _id = new ObjectId(req.query.id as string);
  try {
    const el = await collection.findOne({ _id });
    if (!el) {
      res.status(404).json({ message: 'Movie does not exist' });
      return;
    }

    if (req.method === 'PUT') {
      // add validation
      const updated = Movie.toServer(req.body);
      await collection.replaceOne({ _id }, updated);
      res.status(200).json({ _id, ...updated });
    } else if (req.method === 'DELETE') {
      await collection.deleteOne({ _id });
      res.status(204).json({ message: 'Movie has been deleted succesfully' });
    }
  } catch (e: unknown) {
    console.error(e);
    client.close();
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
