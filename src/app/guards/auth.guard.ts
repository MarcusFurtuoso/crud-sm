import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isLogged()) {
      return true; // Permite a exibição da barra de navegação se o usuário estiver logado
    } else {
      this.router.navigate(['auth']); // Redireciona para a rota de login se o usuário não estiver logado
      return false;
    }
  }
}
