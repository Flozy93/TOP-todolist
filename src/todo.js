export class ToDo {
  title;
  description;
  dueDate;
  priority;
  active;

  constructor(
    title,
    description = "",
    dueDate = null,
    priority = "normal",
    active = true
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.active = active;
  }

  get details() {
    return {
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      active: this.active,
    };
  }

  set details({ title, description, dueDate, priority, active }) {
    if (title !== undefined) this.title = title;
    if (description !== undefined) this.description = description;
    if (dueDate !== undefined) this.dueDate = dueDate;
    if (priority !== undefined) this.priority = priority;
    if (active !== undefined) this.active = active;
  }

  completeTask() {
    this.active = false;
  }

  getTaskStatus(todo) {
    return todo.active ? "Active" : "Completed"; // "Active" if true, "Completed" if false
  }

  getDate(todo) {
    return todo.dueDate ? todo.dueDate : "Undefined";
  }
}
