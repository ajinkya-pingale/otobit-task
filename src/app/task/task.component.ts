import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private commonService: CommonService) { }
  currentPage = 1;
  totalCount = 0;
  taskList = []
  tableSize = 20;
  dataForm = new FormGroup({
    "todo"  : new FormControl('',Validators.required),
    "completed" : new FormControl(false),
    "userId" : new FormControl(5)
  });
  showFormDialog = false;
  currentselectedData = null;
  nameError: boolean = false;
  jobError: boolean = false;
  headerName = 'Add New Task'
  showLoader: boolean = false;
  ngOnInit(): void {
    this.showLoader = true;
    setTimeout(() => {
      this.getData();
    }, 1000);
  }

  openModal(){
    this.showFormDialog = true;
  }

  getData(){
    this.commonService.apiCall('get',`/todos?limit=${this.tableSize}&skip=${this.currentPage}`)?.subscribe(
      data=>{
        this.taskList = data['todos']
        this.showLoader = false;
        this.totalCount = data['total'];
      },error=>{
        console.log(error);
      }
    )
  }

  onTableDataChange(event){
    this.currentPage = event;
    this.getData();
  }

  openAddPopUp(){
    // this.currentselectedMedium=null;
    this.dataForm.reset()
    this.showFormDialog=true;
  }

  openEditPopUp(data){
    this.commonService.apiCall('get',`/todos/${data?.id}`).subscribe(
      data=>{
        this.currentselectedData = data;
        this.headerName = 'Update Task'
        this.dataForm.patchValue({
          todo: data['todo'],
        })
        this.showFormDialog=true;
      }
    )
  }

  addData(){
    this.showLoader = true;
    if(this.dataForm.valid){
      let url;
      let method;
      if(this.currentselectedData){
        method = 'put';
        url = `/todos/${this.currentselectedData['id']}`;
      }else{
        method = 'post';
        url = `/todos/add`;
      }
      this.taskList = [];
      this.commonService.apiCall(method,url, this.dataForm.value).subscribe(
        data=>{
          if(data){
            console.log(data);
            this.getData()
            this.showFormDialog = false;
          }
        },error=>{
          console.log(error);
          this.showLoader = false;
        }
      )
    }else{
      this.showLoader = false;
      if( !this.dataForm.value['name'] ){
        this.nameError = true;
      }
      if( !this.dataForm.value['job'] ){
        this.jobError = true;
      }
    }
  }

  reset(){
    this.dataForm.reset()
  }

  hidePopUp(){
    this.dataForm.reset()
    this.currentselectedData = null;
  }

  daleteData(id){
    this.taskList = [];
    this.showLoader = true;
    this.commonService.apiCall('delete',`/todos/${id}`).subscribe(
      data=>{
        this.getData()
      },error=>{
        console.log(error);
        this.showLoader = false;
      }
    )
  }

  markAsComplete(data){
    this.showLoader = true;
    let dataToSend = {
      completed: true
    }
    this.taskList = [];
    this.commonService.apiCall('put',`/todos/${data['id']}`, dataToSend).subscribe(
      data=>{
        this.getData()
      },error=>{
        console.log(error);
        this.showLoader = false;
      }
    )
  }

}
