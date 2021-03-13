import { Injectable } from '@angular/core'
import { UserProfile } from '../models/profile.model'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn:'root'
})
export class PostsService{
  constructor(private http: HttpClient){}
  fetchUserData(){
    this.http.get<{message:string,userData: UserProfile[]}>(environment.serverRoute+'users').subscribe((fetchedData)=>{
      console.log('postData',fetchedData)
      return fetchedData
    })
  }

  //TODO: Need to check User login authentication
  checkUserLogin(userData){
    this.http.post<{message:string,userData: UserProfile[]}>(environment.serverRoute+'login',userData).subscribe((postData)=>{
      console.log('postData',postData)
      return postData.userData
    })
  }

  async registerNewUserData(data){
    await this.http.post<{message:string,userData:any}>(environment.serverRoute+'register',data).subscribe((responseData)=>{
      console.log('responseData',responseData)
      return responseData 
    })
  }
}
