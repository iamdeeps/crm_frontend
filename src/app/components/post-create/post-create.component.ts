import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { PostsService } from '../../services/posts.service'
import * as XLSX from 'xlsx';

@Component({
  selector: 'post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  @ViewChild('DateSelectorInput', {
    read: MatInput
  }) dateSelector: MatInput;
  registeredUsers:any = []
  maxDate= new Date(new Date())
  type = '.xlsx, .xls, .csv'
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
    this.postsService.registerNewUserData(body).subscribe((fetchedData)=>{
      alert('Data added Successfully')
    })
    this.registeredUsers.push(body)
    form.resetForm()
    this.dateSelector.value  = ''  
  }

  async fetchUsers(){
    this.postsService.fetchUserData().subscribe((fetchedData)=>{
      this.registeredUsers = fetchedData
      this.cd.detectChanges()
    })
  }

  file:File
  arrayBuffer
  exceljsondata

  onFileChange(event){
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  bulkUploadCsv(){
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for(let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      const bstr = arr.join("");
      const workbook = XLSX.read(bstr, {type:"binary"});
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.exceljsondata = XLSX.utils.sheet_to_json(worksheet,{raw:true, defval:""});
      this.postsService.bulkUploadUserData(this.exceljsondata).subscribe((fetchedData)=>{
        this.registeredUsers.push(...fetchedData.userData)
        this.cd.detectChanges()
      })
    }
    fileReader.readAsArrayBuffer(this.file);
  }

}
