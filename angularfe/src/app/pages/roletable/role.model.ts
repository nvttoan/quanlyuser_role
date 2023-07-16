export interface IRole {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
}
export class Role implements IRole {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public description?: string
  ) {}
}
