import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbaDataService } from '../nbas-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errorMessage: string = '';
  hasError: boolean = false;
  successMessage: string = '';
  hasSuccess: boolean = false;

  addForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userDataService: NbaDataService
  ) {
    this.addForm = formBuilder.group({
      name: '',
      username: '',
      password: '',
      repetPassword: '',
    });
  }

  ngOnInit(): void {
    changeStyle();
    function changeStyle() {
      var element = document.getElementById('success');
      element!.style.display = 'none';
      var element = document.getElementById('error');
      element!.style.display = 'none';
    }
  }
  onSubmit(): void {
    const newUser = {
      name: this.addForm.value.name,
      username: this.addForm.value.username,
      password: this.addForm.value.password,
    };
    console.log(newUser.password);

    this.userDataService.register(newUser).subscribe({
      next: (response) => {
        if (response) {
          displaySuccess();
        }
      },
      error: (e) => console.log('error', e),
      complete: () => {},
    });
    // (output: any) => console.log('Succedd', output));

    function displaySuccess() {
      const div = document.getElementById('success');
      div!.style.display = 'block';
    }
  }
}
