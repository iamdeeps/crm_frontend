import { Injectable } from '@angular/core'
import { UserProfile, RegisteringUser } from '../models/profile.model'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn:'root'
})
export class PostsService{
  userData = {}
  constructor(private http: HttpClient){
  }

  fetchUserData(){
    return this.http.get<{message:string,userData:any}>(environment.serverRoute+'user/fetchUser')
  }

  registerNewUserData(data:any){
    return this.http.post<{message:string,userData:any}>(environment.serverRoute+'user/postUser',data)
  }
  
  googleLogin(userData){
    return this.http.post<{message:string,userData:any}>(environment.serverRoute+'user/googleLogin',userData)
  }

  setUserData(data){
    this.userData = data
  } 
  
  getUserData(){
    return this.userData
  }
}
