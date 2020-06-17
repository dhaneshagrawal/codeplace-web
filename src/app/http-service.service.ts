import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { throwError } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
import { map, filter, scan,catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  public loginServiceEvent = new BehaviorSubject({});
  // url = "http://localhost:5000/";

  // url = "http://localhost:8080/";

  
  url = "http://codeplace-env.eba-gmzx2m4s.eu-west-1.elasticbeanstalk.com/";

  constructor(private http: HttpClient, private router: Router) { }

  postRequest(url:string,param:{}){
    return this.http.post(this.url+url,param,httpOptions)
    .pipe(
      catchError(this.handleError.bind(this)) // then handle the error
    );
  }
  postRequestWithToken(url:string,param:{}){
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer '+this.getLoginToken()
      })
    };
    // TODO: update user id from the store  
    param['userId'] = this.getLoginDataByKey("user_id");
    return this.http.post(this.url+url,param,httpOptionsWithToken)
    .pipe(
      catchError(this.handleError.bind(this)) // then handle the error
    );
  }
  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
          return throwError("Something went wrong..while connecting with server");
    }
  }
  setLoginData(data) {
    localStorage.setItem("login_data",JSON.stringify(data.user_profile_details));
  }
  getLoginDataByKey(key){
    let data = JSON.parse(localStorage.getItem("login_data"));
    if(data.hasOwnProperty(key)){
      return data[key];
    }
    return null;
  }
  setLoginToken(token){
    if(token )
      localStorage.setItem("token",token)
  }
  getLoginToken(){
     return localStorage.getItem("token")
  }
  logout(){
    localStorage.setItem("token","");
    this.router.navigate([""]);
  }
  isLogin(){
    try {
      if(this.getLoginToken()) {
        console.log("user is logged in");
        return true;
      }
    }catch(e){

    } 
    return false;
  }
}
