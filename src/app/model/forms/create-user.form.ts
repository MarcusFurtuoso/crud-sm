export class CreateUserForm {
  id: number;
  name: string;
  job: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.job = '';
  }
}
