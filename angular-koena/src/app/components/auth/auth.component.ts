import { Component } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  userLists:any = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let param = this.route.snapshot.paramMap.get('id');
    const uid = Number(param?param:0);
    this.getUserList(uid); 
  }

  async getUserList(id: number){
    await this.authService.getUserList(id)
      .then((res: any) => {
        this.userLists = res;
      }).catch((e: any) => {
          this.router.navigate(['/login']);
    });
  }
}
