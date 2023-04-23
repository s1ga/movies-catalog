import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/utils/db';
import { Movie, NewMovie } from '@/models/movie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const client = await clientPromise;
  const collection = client.db('catalog').collection('movies');
  try {
    let result;
    if (req.method === 'GET') {
      result = await collection.find({}).toArray();
    } else if (req.method === 'POST') {
      // TODO: add validation
      const movie = Movie.toServer(req.body);
      const item = await collection.insertOne(movie);
      result = Movie.fromServer({ _id: item.insertedId.toString(), ...movie as NewMovie });
    }
    res.status(200).json(result);
  } catch (e: unknown) {
    console.error(e);
    client.close();
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
