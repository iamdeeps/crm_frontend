import { Injectable } from '@angular/core'
import { UserProfile } from '../models/profile.model'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn:'root'
})
export class PostsService{
  constructor(private http: HttpClient){}
  async fetchUserData():Promise<{message:string,userData: any}>{
    return new Promise((resolve,reject)=>{
      try {
        this.http.get<{message:string,userData: any}>(environment.serverRoute+'user/fetchUser').subscribe((fetchedData)=>{
          console.log('postData',fetchedData)
          resolve( fetchedData)
        })
      } catch (error) {
        reject(error)
      }
    })
  }


  async registerNewUserData(data){
    return new Promise((resolve,reject)=>{
      try {
        this.http.post<{message:string,userData:any}>(environment.serverRoute+'user/postUser',data).subscribe((responseData)=>{
          console.log('responseData',responseData)
          resolve (responseData) 
        })
      } catch (error) {
        reject(error)
      }
    })
  }


  //TODO: Need to check User login authentication
  // checkUserLogin(userData){
  //   this.http.post<{message:string,userData: UserProfile[]}>(environment.serverRoute+'login',userData).subscribe((postData)=>{
  //     console.log('postData',postData)
  //     return postData.userData
  //   })
  // }
}
