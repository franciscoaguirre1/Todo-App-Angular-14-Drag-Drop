import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Itask } from '../model/task';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm! : FormGroup;
  tasks : Itask [] = [];
  inprogress : Itask [] = [];
  done : Itask [] = [];
  updateIndex! : any;
  isEditEnabled : boolean = false;
  editInProgress : boolean = false;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ["", Validators.required]
    })
  }

  addTask() {
    this.tasks.push( {
      description: this.todoForm.value.item,
      done: false
    });
    this.todoForm.reset();
  }

  onEditTask(item: Itask, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
    this.editInProgress = false;
  }
  onEditInProgress(item: Itask, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = false;
    this.editInProgress = true;
  }

  updateTask() {
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }
  updateInProgress() {
    this.inprogress[this.updateIndex].description = this.todoForm.value.item;
    this.inprogress[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.editInProgress = false
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1)
  }
  deleteInProgressTask(i: number) {
    this.inprogress.splice(i, 1)
  }
  deleteDoneTask(i: number) {
    this.done.splice(i, 1)
  }



  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
