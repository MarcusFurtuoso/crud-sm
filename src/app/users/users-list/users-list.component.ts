import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { UserResponse } from '../../model/responses/user.reponse';
import { UserService } from '../../service/user.service';
import { ReqresPageReponse } from 'src/app/model/base/reqres-page.response';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [ConfirmationService],
})
export class UsersListComponent implements OnInit {
  @ViewChild('confirmation') confirmation: any;

  selectedUserId: number | null = null;

  items: MenuItem[] = [];

  first: number = 0;
  rows: number = 6;

  userPage?: ReqresPageReponse<UserResponse>;

  users: UserResponse[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.userService.getListUsers().subscribe((data) => {
      this.userPage = data;
      this.users = this.userPage.data;
    });
  }

  public editUser(id: number) {
    this.router.navigate(['users', 'edit', id]);
  }

  onPageChange(event: PageEvent) {
    console.log(event);

    this.userService.getListUsers(Number(event.page) + 1).subscribe((data) => {
      this.userPage = data;
      this.users = this.userPage.data;
    });
  }

  showConfirmation(userId: number): void {
    this.selectedUserId = userId;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      accept: () => {
        this.onDeleteConfirmed(true);
      },
      reject: () => {
        this.onDeleteConfirmed(false);
      },
    });
  }

  onDeleteConfirmed(isAccepted: boolean): void {
    if (isAccepted && this.selectedUserId !== null) {
      console.log('ID do usuário a ser excluído:', this.selectedUserId);
      this.deleteUser(this.selectedUserId);
      this.alertService.showSuccessAlert('User deleted successfully!');
      this.selectedUserId = null;
    }
    this.confirmationService.close();
  }

  public deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((data) => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }
}
