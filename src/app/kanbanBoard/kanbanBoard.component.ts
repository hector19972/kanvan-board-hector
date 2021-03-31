import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { getElement } from 'h8k-components/dist/types/stencil-public-runtime';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})

export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose

  ngOnInit() {
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  @ViewChild("create-task-input") taskName: ElementRef;

  createTask = (nombre) => {
    this.tasks.push({ name: nombre, stage: 0 });
    this.configureTasksForRendering();
  }
  taskBack = (task: Task) => {
    //console.log(task.name);
    this.tasks[this.tasks.indexOf(task)].stage--;
    this.configureTasksForRendering();
  }
  taskFoward = (task: Task) => {
    //console.log(task.name);
    this.tasks[this.tasks.indexOf(task)].stage++;
    this.configureTasksForRendering();
  }
  taskDelete = (task: Task) => {
    //console.log(task);
    //console.log(this.tasks);
    /*
    this.tasks.find((task)=>{
      console.log("Encontrado");
    } );*/
    //console.log(this.tasks.indexOf(task));
    this.tasks.splice(this.tasks.indexOf(task),1);
    this.configureTasksForRendering();
  }
}

interface Task {
  name: string;
  stage: number;
}
