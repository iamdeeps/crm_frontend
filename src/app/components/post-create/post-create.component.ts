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

  async onSubmitForm(form: NgForm){
    if(form.invalid){
      alert('FORM IS INVALID BRO, PHEWWW!!! THANKS TO MY VALIDATIONS')
      return ;
    }

    //this.loading = true;
    let body = {
        name:form.value.name,
        email:form.value.email,
        age:form.value.dateOfBirth,
    }
    await this.postsService.registerNewUserData((body))
    form.resetForm()
  }

}
