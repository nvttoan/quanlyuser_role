export class Menu {
  id!: number;
  nameMenu: string = '';
  code: string = '';
  url: string = '';
  urlParent: string = '';
  description: string = '';
  icon: string = '';
  roles!: { name: string }[];
}
