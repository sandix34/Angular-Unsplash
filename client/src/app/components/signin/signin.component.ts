import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from 'src/app/shared/store';
import { TrySignin } from 'src/app/shared/store/actions/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public signinForm: FormGroup;
  public error: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  public submit(): void {
    this.store.dispatch(new TrySignin(this.signinForm.value));
  }
}
