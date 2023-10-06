import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { signinServiceService } from 'src/app/services/singin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
selectedMenuItem: any;
selectedMenuIcon: any;
user: string | null = sessionStorage.getItem('usertype'); 
  showresetform = true;
  constructor(private router:Router, private signinServiceService:signinServiceService){
    if(this.user==='User'){
      this.showresetform = false;
      //console.log(this.showresetform);
    }
  }

  getSessionUsername(): string | null {
    return sessionStorage.getItem('userName');
  }

  ngOnInit() {
   
    this.selectedMenuItem = localStorage.getItem('selectedMenuItem');
    this.selectedMenuIcon = localStorage.getItem('selectedMenuIcon');
  }

  logoutUser() {
    
    const data = {
      loginId: sessionStorage.getItem('loginId'),
      userId: sessionStorage.getItem('userId'),
    };
    this.signinServiceService.logout(data).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: `Thank You... `,
          text: 'signed out successfully',
        });
        sessionStorage.clear();
        localStorage.removeItem('selectedMenuItem');
        localStorage.removeItem('selectedMenuIcon');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Logout error:', error);
        const errorMessage = error?.error?.message || 'An error occurred';
            Swal.fire({
              icon: 'error',
              title: 'Sorry...',
              text: `${errorMessage}`,
            });
      }
    );
  }


  selectMenu(menuName: string, menuIcon: string) {
    if (menuName === 'Dashboard') {
      console.log('dashboard selected');
      this.selectedMenuItem = null;
      this.selectedMenuIcon = null;
    } else {
      this.selectedMenuItem = menuName;
      this.selectedMenuIcon = menuIcon;
      localStorage.setItem('selectedMenuItem', this.selectedMenuItem);
      localStorage.setItem('selectedMenuIcon', this.selectedMenuIcon);
    }
  
  }

}
