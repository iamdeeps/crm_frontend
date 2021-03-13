import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { RegisteringUser } from "src/app/models/profile.model";

@Component({
  selector: 'post-list',
  templateUrl:"./post-list.component.html",
  styleUrls:['./post-list.component.css']
})

export class PostListComponent implements OnInit{
  @Input() users:RegisteringUser[] = []
  constructor(){
  }

  ngOnInit(){
  }

}
