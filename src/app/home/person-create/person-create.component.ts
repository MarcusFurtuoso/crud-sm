import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserForm } from 'src/app/model/forms/create-user.form';
import { AlertService } from 'src/app/service/alert.service';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css'],
})
export class PersonCreateComponent implements OnInit {
  loading!: boolean;

  public createForm: CreateUserForm = new CreateUserForm();

  constructor(
    private router: Router,
    private personService: PersonService,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  public onSubmit(form: NgForm) {
    this.personService.createUser(this.createForm!).subscribe({
      next: () => {
        this.toggleLoading();
        this.alertService.showSuccessAlert('User created successfully!');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.toggleLoading();
        this.alertService.showErrorAlert('Error creating user!');
      },
    });
  }

  public isInvalidField(form: NgForm, control: string): boolean {
    return (
      (form.controls[control]?.invalid && form.controls[control]?.touched) ||
      form.controls[control]?.dirty
    );
  }

  navigateBack() {
    this.router.navigate(['/home']); // Navega de volta para a página de listagem de pessoas
  }

  private toggleLoading(): void {
    this.loading = !this.loading;
  }
}
