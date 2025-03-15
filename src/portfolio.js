export class Portfolio {
  list;

  constructor() {
    this.list = [];
  }

  getDetails() {
    return this.list;
  }

  addProject(project) {
    this.list.push(project);
  }
}
