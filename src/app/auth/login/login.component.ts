import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/model/forms/login.form';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading!: boolean;

  public loginForm: LoginForm = new LoginForm();

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  public ngOnInit(): void {}

  public onSubmit(form: NgForm): void {
    console.log(this.loginForm);

    this.authService.login(this.loginForm!).subscribe({
      next: () => {
        this.toggleLoading();
        this.alertService.showSuccessAlert('Login successfully!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.alertService.showErrorAlert('Incorrect email or password!');
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

  public navigateToRegister(): void {
    this.router.navigate(['auth', 'register']);
  }
}
