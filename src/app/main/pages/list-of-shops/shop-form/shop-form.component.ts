import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Shop } from '../shop.model';
import { ShopListService } from '../list-of-shops.service';
import swal from 'sweetalert';

@Component({
    selector: 'contacts-contact-form-dialog',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ShopFormDialogComponent {
    action: string;
    shops: Shop;
    contactForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ShopFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ShopFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _shopListSrvc: ShopListService,
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Edit Shop';
            this.shops = _data.contact;
        } else {
            this.dialogTitle = 'New Shop';
            this.shops = new Shop({});
        }

        this.contactForm = this.createContactForm();
        console.log(this.shops);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.shops.id],
            email: [this.shops.email],
            isRegisteredShop: [this.shops.isRegisteredShop],
            mainContact: [this.shops.mainContact],
            mainName: [this.shops.mainName],
            secondaryContact: [this.shops.secondaryContact],
            secondaryName: [this.shops.secondaryName],
            status: [this.shops.status],
            writtenAddress: [this.shops.writtenAddress]
        });
    }

    onWhatActions(type: string): void{
        this._shopListSrvc.accpetedOrDeclined(this.shops.uid, type).then(response => {
            swal({
                title: this.shops.mainName,
                text: `YOU ${type}`,
                icon: 'info',
            });
            this.matDialogRef.close();  
        });
    }
}
