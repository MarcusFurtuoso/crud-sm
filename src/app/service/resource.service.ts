import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { ReqresPageReponse } from '../model/base/reqres-page.response';
import { ResourceResponse } from '../model/responses/resource.response';
import { ReqresResponse } from '../model/base/reqres.response';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private apiUrl: string = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  public getSingleResources(
    id: number
  ): Observable<ReqresResponse<ResourceResponse>> {
    return this.http
      .get<ReqresResponse<ResourceResponse>>(`${this.apiUrl}/unknown/${id}`)
      .pipe(first());
  }

  public getListResources(
    page: number = 0
  ): Observable<ReqresPageReponse<ResourceResponse>> {
    let params = new HttpParams();
    params = params.append('page', page);
    return this.http
      .get<ReqresPageReponse<ResourceResponse>>(`${this.apiUrl}/unknown`, {
        params,
      })
      .pipe(first());
  }
}
