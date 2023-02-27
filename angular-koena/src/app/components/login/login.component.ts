import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { Router } from '@angular/router';

@Component({ 
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'] 
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }

    async onSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        
        await this.authService.login(this.f.username.value, this.f.password.value)
        .then((res: { access_token: string; }) => {
            let token = res.access_token;
            if(token){
                localStorage.setItem('me-token', res.access_token);
                this.router.navigate(['/auth']);
            }else{
                  
            }
        }).catch((e: any) => {
            console.log(e)
        });
        
        this.loading = false;
    }
}