import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditUserform } from 'src/app/model/forms/edit-user.form';
import { AlertService } from 'src/app/service/alert.service';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css'],
})
export class PersonEditComponent implements OnInit {
  user: EditUserform = new EditUserform(); // Objeto para armazenar os dados do usuário

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadUserDetails();
  }

  loadUserDetails() {
    const userIdParam = this.route.snapshot.paramMap.get('id');

    if (userIdParam !== null) {
      const userId = parseInt(userIdParam, 10);

      if (!isNaN(userId)) {
        const user = this.personService.getUserById(userId);

        if (user) {
          this.user = user;
        } else {
          console.error('Usuário não encontrado');
        }
      } else {
        console.error('ID de usuário inválido');
      }
    } else {
      console.error('ID de usuário ausente');
    }
  }

  onSubmit() {
    this.personService.editUser(this.user).subscribe(
      () => {
        console.log(this.user);
        this.alertService.showSuccessAlert('User updated successfully!');
        this.router.navigate(['/home']); // Redireciona de volta para a lista de pessoas após a edição
      },
      (error) => {
        this.alertService.showErrorAlert('Error updating user!');
      }
    );
  }

  navigateBack() {
    this.router.navigate(['/home']); // Navega de volta para a página de listagem de usuários
  }
}
