import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../services/posts.service'

@Component({
  selector: 'post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  registeredUsers:any = []
  maxDate= new Date(new Date())
  constructor(public postsService:PostsService) {
    this.fetchUsers()
  }

  ngOnInit(): void {
  }
  date
  dateChanged($event){
    this.date = +new Date($event.value)
  }

  async onSubmitForm(form: NgForm){
    if(form.invalid){
      alert('FORM IS INVALID BRO, PHEWWW!!! THANKS TO MY VALIDATIONS')
      return ;
    }
    let body = {
      name:form.value.name,
      email:form.value.email,
      dateOfBirth:this.date,
    }
    console.log('body',body)
    await this.postsService.registerNewUserData(body)
    this.registeredUsers.push(body)
    //form.resetForm()
  }

  async fetchUsers(){
    this.registeredUsers  = await this.postsService.fetchUserData()
  }

}
