import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                width: 'fullwidth',
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    login(): void {
        const formValues = this.loginForm.getRawValue();
        console.log('formValues', formValues);
        if (formValues.username !== 'admin' && formValues.password !== 'admin') {
            swal({
                title: 'Ooops!',
                text: 'Wrong credentials',
                icon: 'error',
            });
            return;
        }
        if (formValues.username === 'admin' && formValues.password === 'admin') {
            setTimeout(() => {
                this._router.navigateByUrl('/list-of-shops');
            }, 1000);
            return;
        }
        

    }
}
