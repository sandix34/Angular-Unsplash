import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/shared/store';
import { TrySignup } from 'src/app/shared/store/actions/auth.actions';
import { Observable } from 'rxjs';
import { errorAuthSelector } from 'src/app/shared/store/selectors/auth.selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  public error$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });

    this.error$ =this.store.pipe(
      select(errorAuthSelector)
    );
  }

  public submit(): void {
    this.store.dispatch(new TrySignup(this.signupForm.value));
  }

}
