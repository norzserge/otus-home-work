export interface INews {
  id?: string;
  date: string;
  url: string;
  title: string;
}

export class News implements INews {
  constructor(
    public date: string,
    public url: string,
    public title: string,
  ) {}
}
