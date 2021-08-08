export interface BlogInterface {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export default class BlogClass implements BlogInterface {
  public id: number;
  public name: string;
  public description: string;
  public imageUrl: string;

  constructor(blog: BlogInterface = { id: null, name: "", description: "", imageUrl: "" }) {
    this.id = blog.id;
    this.name = blog.name;
    this.description = blog.description;
    this.imageUrl = blog.imageUrl;
  }
}
