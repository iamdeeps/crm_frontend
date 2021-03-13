import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../services/posts.service'

@Component({
  selector: 'post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsService:PostsService) {
  }

  ngOnInit(): void {
  }

  onSubmitForm(form: NgForm){
    if(form.invalid){
      alert('FORM IS INVALID BRO, PHEWWW!!! THANKS TO MY VALIDATIONS')
      return ;
    }
    this.postsService.addPosts(form.value.title,form.value.content)
    form.resetForm()
  }

}
