export class Project {
  name;
  list;

  constructor(name) {
    this.name = name;
    this.list = [];
  }

  get details() {
    return {
      name: this.name,
      list: this.list,
    };
  }

  addTodo(todo) {
    this.list.push(todo);
  }

  resetList() {
    this.list = [];
  }

  renameProject(newName) {
    this.name = newName;
  }
}
