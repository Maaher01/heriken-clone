import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const BASE_API_URL = `${environment.baseUrl}user/`;

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private _httpClient = inject(HttpClient);

  editUserById(id: any, editPayload: any) {
    return this._httpClient.put(
      BASE_API_URL + `edit-user-by-id/${id}`,
      editPayload
    );
  }
}
