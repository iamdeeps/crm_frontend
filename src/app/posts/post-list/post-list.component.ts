import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PostsService } from "../../../app/services/posts.service";
import { Post } from "../../models/post.model";

@Component({
  selector: 'post-list',
  templateUrl:"./post-list.component.html",
  styleUrls:['./post-list.component.css']
})

export class PostListComponent implements OnInit,OnDestroy{
  posts:Post[] = []
  private postSubscription:Subscription
  constructor(public postsService:PostsService){}

  ngOnInit(){
    this.posts = this.postsService.getPosts()
    this.postSubscription = this.postsService.getPostUpdateListener().subscribe((posts:Post[])=>{
      this.posts = posts
    })
  }

  ngOnDestroy(){
    this.postSubscription.unsubscribe()
  }
}
