import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PostsService } from "../../../app/services/posts.service";
import { UserProfile } from "../../models/profile.model";

@Component({
  selector: 'post-list',
  templateUrl:"./post-list.component.html",
  styleUrls:['./post-list.component.css']
})

export class PostListComponent implements OnInit,OnDestroy{
  registeredUsers:any = []
  private postSubscription:Subscription
  constructor(public postsService:PostsService){
    this.fetchUsers()
  }

  ngOnInit(){
  }

  async fetchUsers(){
    this.registeredUsers  = await this.postsService.fetchUserData()
  }

  ngOnDestroy(){
    this.postSubscription.unsubscribe()
  }
}
