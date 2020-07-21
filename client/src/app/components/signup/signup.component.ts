import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/shared/store';
import { TrySignup } from 'src/app/shared/store/actions/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  public error: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  public submit(): void {
    this.store.dispatch(new TrySignup(this.signupForm.value));
  }

}
