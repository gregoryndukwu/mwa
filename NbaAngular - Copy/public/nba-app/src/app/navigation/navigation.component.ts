import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { NbaDataService } from '../nbas-data.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  get authorized() {
    return this.authService.isLoggedIn;
  }

  addForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userDataService: NbaDataService,
    private userService: UserDataService,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.addForm = formBuilder.group({
      username: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {}
}
