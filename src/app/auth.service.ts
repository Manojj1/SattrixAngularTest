import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  
  public redirectUrl: string = '/dashboard'; // Default redirect URL after login

  constructor(private router: Router) {}

  // Simulate login by setting isAuthenticated to true
  login(): void {
    this.isAuthenticated = true;
    this.router.navigateByUrl(this.redirectUrl); // Redirect to the original attempted URL after login
  }

  // Logout function to clear session and navigate to login page
  logout(): void {
    this.isAuthenticated = false;
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  // Check if the user is authenticated
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
