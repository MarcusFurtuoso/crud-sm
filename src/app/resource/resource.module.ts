import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceListComponent } from './resource-list/resource-list/resource-list.component';
import { ResourceRoutingModule } from './resource-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  imports: [
    CommonModule,
    ResourceRoutingModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
  ],
  declarations: [ResourceListComponent]
})
export class ResourceModule { }
