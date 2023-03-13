import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }


  // @ts-ignore
  apiCall( type: string, url: string, body= {}, header = {} ) {
    url = environment.apiEndpoint+url;

    //
    switch (type.toLowerCase()){
      case 'get': {
        return this.http.get(url, header).pipe(map(data => {

          return data
        }));
      }
      case 'post': {
        return this.http.post(url, body,header).pipe(map(data => {

          return data
        }));
      }
      case 'put': {
        return this.http.put(url, body);
      }
      case 'delete': {
        return this.http.delete(url);
      }
    }
  }
}
