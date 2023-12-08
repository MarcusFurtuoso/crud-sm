import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ReqresPageReponse } from 'src/app/model/base/reqres-page.response';
import { CreateUserForm } from 'src/app/model/forms/create-user.form';
import { CreateUserResponse } from 'src/app/model/responses/create-user.response';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  loading!: boolean;

  personPage!: ReqresPageReponse<CreateUserForm>;

  users: CreateUserResponse[] = [];

  items: MenuItem[] = [];

  public createUserForm: CreateUserForm = new CreateUserForm();

  constructor(private router: Router, private personService: PersonService) {}

  ngOnInit() {
    this.getPersonData();
  }

  public getPersonData(): CreateUserResponse[] {
    var persons = this.personService.getPersonData();
    return (this.users = persons);
  }

  public editUser(id: number) {
    this.router.navigate(['home', 'edit', id]);
  }

  public createUser() {
    this.router.navigate(['home', 'create']);
  }

  public deleteUser(id: number): void {
    console.log(id);
    this.personService.deleteUser(id);
    this.getPersonData();
  }
}
