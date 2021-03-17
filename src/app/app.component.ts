import { ChangeDetectorRef, Component } from '@angular/core';
import { PostsService } from './services/posts.service';

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  showDashboard = true
  constructor(
    public postService:PostsService,
    private cd:ChangeDetectorRef)
    {}

  ngOnInit(){
    google.accounts.id.initialize({
      client_id: '995726106321-95i2teatfjodc60rd9gsc5lj26o49dr1.apps.googleusercontent.com',
      callback: this.authenticationResponse,
    });
    google.accounts.id.prompt(notification=>{
      if(notification.isDismissedMoment()){
        console.log('getDismissedReason',notification.getDismissedReason())
      }else if(notification.isNotDisplayed()){
        console.log('getDismissedReason',notification.getNotDisplayedReason())
      }
    })
  }

  authenticationResponse= async (response)=>{
    this.postService.googleLogin(response).subscribe((data)=>{
      this.postService.setUserData(data.userData)
      this.showDashboard = !this.showDashboard
      this.cd.detectChanges()
    })
  }
  
  signOut(){
    google.accounts.id.disableAutoSelect();
    console.log('signout')
  }
}
