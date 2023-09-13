export class User {
  id!: number;
  username: string = '';
  email: string = '';
  name: string = '';
  position: string = '';
  age: number = null;
  password: string = '';
  roles!: { name: string }[];
}
