import {ResolveFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ContentService} from "../services/content.service";
import {ContentResponse} from "../objects/ContentResponse";
import {of} from "rxjs";

export const contentResolver: ResolveFn<ContentResponse> = (route, state) => {
  const username = route.paramMap.get("contentUsername")
  const contentName = route.paramMap.get("contentName")
  const routerIn = inject(Router)
  if(username != null && contentName != null) {
    return inject(ContentService).getContentData(username, contentName).then(d => d)
        .catch((error) => {
          routerIn.navigateByUrl("/notfound")
          //Not reachable but typescript will complain
          return genUselessContentRes();
        });
  }
  //Not reachable because username and contentname always defined
    routerIn.navigateByUrl("/notfound")
  return of(genUselessContentRes());
};

function genUselessContentRes(){
  return new ContentResponse("", "", "",  new Date(), "","")
}
