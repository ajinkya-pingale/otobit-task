import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    InputTextModule
  ]
})
export class TaskModule { }
