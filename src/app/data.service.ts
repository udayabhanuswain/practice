     import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonService {


  constructor(private http: Http) { }

  Get_test() {
    return this.http.get('http://localhost:8080/api/Get_test?id=Developer&token=' + 'Udaya' + '&geo=' + 'FullStack')
      .map((response: Response) => response.json());
  }

  // Gettest2(user_data) {
  //  // console.log("From Service part "+user_data)
  //   return this.http.post('http://localhost:8080/api/Get_test2',user_data)
  //     .map((response: Response) => response.json());
  // }

  Gettest2(user_data) {
    // console.log("From Service part "+user_data)
    return this.http.post('http://localhost:8080/api/Get_test2', user_data)
      .map((response: Response) => response.json());
  }

  Gettest3(user_data) {
    // console.log("From Service part "+user_data)
    return this.http.put('http://localhost:8080/api/Get_test3', user_data)
      .map((response: Response) => response.json());
  }


}  