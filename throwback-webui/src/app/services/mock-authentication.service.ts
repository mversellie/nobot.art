import {signal, WritableSignal} from '@angular/core';

export class MockAuthenticationService {
  isLoggedIn: WritableSignal<boolean> = signal(this.isTokenPresentAndValid())
  tokenPresent:boolean = true;
  mockToken:string = "mock token data"


  constructor() {
  }

  login(){
    this.tokenPresent = true;
    this.isLoggedIn.set(true)
  }

  logout(){
    this.tokenPresent = false;
    this.isLoggedIn.set(false)
  }

  setIsTokenPresent(status:boolean){
    this.tokenPresent = status
  }

  isTokenPresentAndValid(){
    return this.tokenPresent
  }

  getToken(){
    return "Bearer " + this.mockToken;
  }

}
