export class TodoItem {

  constructor(taskVal: string, completeVal: boolean = false) {
      this.task = taskVal;
      this.complete = completeVal;
  }

  task: string;
  complete: boolean;
}
