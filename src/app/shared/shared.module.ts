import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import {ToastModule} from 'primeng/toast';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AlertComponent,

  ],
  imports: [
    CommonModule,
    ToastModule,
    TableModule,
  ],
  exports: [
    AlertComponent,
  ]
})
export class SharedModule { }
