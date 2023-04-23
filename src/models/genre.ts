/* eslint-disable no-underscore-dangle */
export interface IGenre {
  _id: string;
  name: string;
}

export class Genre {
  public id: string | undefined;
  public name: string | undefined;

  public static fromServer(dto: IGenre): Genre {
    const genre = new Genre();
    genre.id = dto._id;
    genre.name = dto.name;
    return genre;
  }

  public static toServer(name: string): Genre {
    const genre = new Genre();
    genre.name = name;
    return genre;
  }
}
