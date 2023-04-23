import { ObjectId } from 'mongodb';

/* eslint-disable no-underscore-dangle */
export interface IMovie {
  _id: string;
  typeId: ObjectId | string;
  year: number;
  duration: number;
  image?: string;
  name: string;
  genresId: (ObjectId | string)[];
  description?: string;
  isWatched: boolean;
}

export type NewMovie = Omit<IMovie, '_id'>;

export class Movie {
  public id: string | undefined;
  public typeId: ObjectId | undefined;
  public year: number | undefined;
  public duration: number | undefined;
  public image: string | undefined;
  public name: string | undefined;
  public genresId: ObjectId[] | undefined;
  public description: string | undefined;
  public isWatched: boolean | undefined;

  public static fromServer(dto: IMovie): Movie {
    const movie = new Movie();
    movie.id = dto._id;
    movie.typeId = dto.typeId as ObjectId;
    movie.year = dto.year;
    movie.duration = dto.duration;
    movie.name = dto.name;
    movie.genresId = dto.genresId as ObjectId[];
    movie.description = dto.description;
    movie.image = dto.image;
    movie.isWatched = dto.isWatched;
    return movie;
  }

  public static toServer(
    { name, typeId, year, duration, genresId, description, image, isWatched }: NewMovie,
  ): Movie {
    const movie = new Movie();
    movie.name = name;
    movie.typeId = new ObjectId(typeId);
    movie.year = year;
    movie.duration = duration;
    movie.genresId = genresId.map((id: ObjectId | string) => new ObjectId(id));
    movie.isWatched = isWatched || false;
    if (description) {
      movie.description = description;
    }
    if (image) {
      movie.image = image;
    }
    return movie;
  }
}
