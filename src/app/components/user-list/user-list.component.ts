import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  pageTitle: string = 'Users';
  usersList: User[] = [];
  searchForm: FormGroup;
  loadingUsers: boolean = false;
  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      keyword: ['']
    });
    this.getUsers();

    this.searchForm.valueChanges.subscribe((newValue)=> {
      this.search(newValue.keyword);
    });
  }

  getUsers(){
    this.loadingUsers = true;
    this.userService.getUsers().subscribe((response)=>{
      this.usersList = response.sort((a, b) => a.name.localeCompare(b.name));
      this.loadingUsers = false;
    });
  }

  resetBalance(){
    this.usersList.map((u)=>{u.balance=0});
  }

  search(keyword: string) {
    this.userService.getUsers().subscribe((response)=>{
      this.usersList = response.filter(user => {
        return (user.name.toLowerCase().match(keyword.toLowerCase()));
      }).sort((a, b) => a.name.localeCompare(b.name));;
    });
  }

  searchReset() {
    this.searchForm.patchValue({keyword: ''});
  }

}
