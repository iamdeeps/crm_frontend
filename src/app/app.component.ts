import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit(){
    console.log('started')
  }
  authenticationResponse(event){
  console.log("🚀 ~ file: app.component.ts ~ line 13 ~ AppComponent ~ authenticationResponse ~ event", event)

  }
  // authenticationResponse=(response)=>{
  //   console.log("authenticationResponse", response)
  // }


}
