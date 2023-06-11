export class User {
    id!: number;
    username: string = '';
    email: string = '';
    password: string = '';
    roles!: { name: string }[];
}
