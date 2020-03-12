import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Shop } from '../shop.model';

@Component({
    selector     : 'contacts-contact-form-dialog',
    templateUrl  : './contact-form.component.html',
    styleUrls    : ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ShopFormDialogComponent
{
    action: string;
    contact: Shop;
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
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Edit Shop';
            this.contact = _data.contact;
        }
        else
        {
            this.dialogTitle = 'New Shop';
            this.contact = new Shop({});
        }

        this.contactForm = this.createContactForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.contact.id],
            name    : [this.contact.name],
            lastName: [this.contact.lastName],
            avatar  : [this.contact.avatar],
            nickname: [this.contact.nickname],
            company : [this.contact.company],
            jobTitle: [this.contact.jobTitle],
            email   : [this.contact.email],
            phone   : [this.contact.phone],
            address : [this.contact.address],
            birthday: [this.contact.birthday],
            notes   : [this.contact.notes]
        });
    }
}
