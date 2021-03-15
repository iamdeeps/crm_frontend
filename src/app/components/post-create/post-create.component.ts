import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(
    public postsService:PostsService,
    private cd:ChangeDetectorRef) {
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
    this.postsService.registerNewUserData(body).subscribe((fetchedData)=>{
      console.log('postData',fetchedData)
    })
    this.registeredUsers.push(body)
    form.resetForm()
  }

  async fetchUsers(){
    this.postsService.fetchUserData().subscribe((fetchedData)=>{
      console.log(fetchedData)
      this.registeredUsers = fetchedData
      this.cd.detectChanges()
    })
  }

}
