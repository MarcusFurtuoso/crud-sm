import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable, first, tap } from 'rxjs';
import { ReqresResponse } from '../model/base/reqres.response';
import { UserResponse } from '../model/responses/user.reponse';
import { ReqresPageReponse } from '../model/base/reqres-page.response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string = 'https://reqres.in/api';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  public getSingleUser(id: number): Observable<ReqresResponse<UserResponse>> {
    return this.http
      .get<ReqresResponse<UserResponse>>(`${this.apiUrl}/users/${id}`)
      .pipe(
        tap((res) =>
          this.localStorageService.setItemForLocalStorage(
            'user',
            JSON.stringify(res.data)
          )
        )
      );
  }

  public getListUsers(
    page: number = 0
  ): Observable<ReqresPageReponse<UserResponse>> {
    let params = new HttpParams();
    params = params.append('page', page);
    return this.http
      .get<ReqresPageReponse<UserResponse>>(`${this.apiUrl}/users`, { params })
      .pipe(first());
  }

  public deleteUser(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
