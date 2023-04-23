/* eslint-disable no-underscore-dangle */
export interface IType {
  _id: string;
  name: string;
}

export class Type {
  public id: string | undefined;
  public name: string | undefined;

  public static fromServer(dto: IType): Type {
    const genre = new Type();
    genre.id = dto._id;
    genre.name = dto.name;
    return genre;
  }

  public static toServer(name: string): Type {
    const genre = new Type();
    genre.name = name;
    return genre;
  }
}
