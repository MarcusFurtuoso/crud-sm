import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'crud-sm';

  items: MenuItem[] = [];

  constructor(private router: Router, private authService: AuthService) {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
      { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['/users'] },
      {
        label: 'Colors',
        icon: 'pi pi-fw pi-palette',
        routerLink: ['/resources'],
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        style: { 'font-size': '14px', 'margin-left': 'auto' },
        command: () => {
          this.authService.logout(), this.router.navigate(['auth', 'login']);
        },
      },
    ];
  }

  isLoggedIn() {
    return this.authService.isLogged(); // Método do serviço de autenticação para verificar se o usuário está logado
  }
}
