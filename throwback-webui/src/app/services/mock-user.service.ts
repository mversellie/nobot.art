import {Injectable, signal, Signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockUserService {
  usernameSetter = "testing"

  username(){
    return this.usernameSetter
  }

  setUsername(user:string){
    this.usernameSetter = user
  }
}
