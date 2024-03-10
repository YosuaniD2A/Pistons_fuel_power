import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';


export const influencersGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const influencerToken = localStorage.getItem('influencerToken');
  if (influencerToken) {
    return true;
  } else {
    router.navigateByUrl('/page/influencers-program');
    return false;
  }
};
