import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterForm } from 'src/app/model/forms/register.form';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loading!: boolean;

  public registerForm: RegisterForm = new RegisterForm();

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  public onSubmit(form: NgForm): void {
    console.log(this.registerForm);

    this.authService.register(this.registerForm!).subscribe({
      next: () => {
        this.toggleLoading();
        this.alertService.showSuccessAlert('Registration successful!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.alertService.showErrorAlert('Error when registering!');
      },
    });
  }

  private toggleLoading(): void {
    this.loading = !this.loading;
  }

  public isInvalidField(form: NgForm, control: string): boolean {
    return (
      (form.controls[control]?.invalid && form.controls[control]?.touched) ||
      form.controls[control]?.dirty
    );
  }

  public navigateToLogin(): void {
    this.router.navigate(['auth', 'login']);
  }
}
