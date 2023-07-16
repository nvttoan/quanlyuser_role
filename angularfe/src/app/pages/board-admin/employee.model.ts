export interface IEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  age?: number;
  emailId?: string;
}
export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public age?: number,
    public emailId?: string
  ) {}
}
