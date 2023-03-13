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
  allData = []
  tableSize = 0;
  dataForm = new FormGroup({
    "name"  : new FormControl('',Validators.required),
    "job" : new FormControl('',Validators.required)
  });
  showFormDialog = false;
  currentselectedData = null;
  nameError: boolean = false;
  jobError: boolean = false;
  ngOnInit(): void {
    this.getData()
  }

  openModal(){
    this.showFormDialog = true;
  }

  getData(){
    this.commonService.apiCall('get',`/users?page=${this.currentPage}`)?.subscribe(
      data=>{
        this.allData = data['data']
        this.totalCount = data['total'];
        this.tableSize = data['per_page']
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
    this.commonService.apiCall('get',`/users/${data?.id}`).subscribe(
      data=>{
        console.log(data);
        this.currentselectedData = data['data'];
        this.dataForm.patchValue({
          name: this.currentselectedData['first_name'],
          job: this.currentselectedData['last_name']
        })
        this.showFormDialog=true;
      }
    )
    // this.dataForm.patchValue({
    //   name
    // })
  }

  addData(){
    if(this.dataForm.valid){
      if(this.currentselectedData){
        this.commonService.apiCall('put',`/users/:${this.currentselectedData['id']}`, this.dataForm.value).subscribe(
          data=>{
            if(data){
              console.log(data);
              this.getData()
              this.showFormDialog = false;
            }
          },error=>{
            console.log(error);

          }
        )
      }else{
        this.commonService.apiCall('post',`/users`, this.dataForm.value).subscribe(
          data=>{
            if(data){
              console.log(data);
              this.getData()
              this.showFormDialog = false;
            }
          },error=>{
            console.log(error);

          }
        )
      }
    }else{
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
    this.commonService.apiCall('delete',`/users/${id}`).subscribe(
      data=>{
        this.getData()
      },error=>{
        console.log(error);

      }
    )
  }

}
