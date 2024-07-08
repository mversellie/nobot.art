import {Injectable, signal, WritableSignal} from '@angular/core';

Injectable({
  providedIn: 'root'
})
export class MockAuthenticationService {
  tokenPresent:boolean = true;
  mockToken:string = "mock token data"
  isLoggedIn: WritableSignal<boolean> = signal(this.isTokenPresentAndValid())


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
