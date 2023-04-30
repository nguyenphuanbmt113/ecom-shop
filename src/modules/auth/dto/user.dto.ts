import { Expose, Exclude } from 'class-transformer';

export class UserDtoExport {
  @Expose()
  email: string;

  @Expose()
  address: string;

  @Expose()
  mobile: number;

  @Expose()
  name: string;

  @Expose()
  role: string;

  @Expose()
  image: string;

  @Exclude()
  password: string;
}
