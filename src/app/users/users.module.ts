import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';

import { TableModule } from 'primeng/table';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { UsersRoutingModule } from './home-routing.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
  ],
})
export class UsersModule {}
