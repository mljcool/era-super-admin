import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';
import { Shop } from './shop.model';
import { SampleList, SampleUser } from './contants/db';
import {
    AngularFirestoreCollection,
    AngularFirestore
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface IShopLocation {
    latitude: number;
    longitude: number;
}

export interface IAutoShop {
    uid: string;
    isRegisteredShop: boolean;
    status: boolean;
    email: string;
    mainName: string;
    secondaryName: string;
    mainContact: string;
    emailAddress: string;
    secondaryContact: string;
    writtenAddress: string;
    location: any;
    functionalLocation: IShopLocation;
}

@Injectable()
export class ShopListService implements Resolve<any> {
    private dbPath = '/autoShop';
    shopsRef: AngularFirestoreCollection<IAutoShop> = null;

    onContactsChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: BehaviorSubject<any>;
    onUserDataChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    shops: Shop[];
    user: any;
    selectedContacts: string[] = [];

    searchText: string;
    filterBy: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private afs: AngularFirestore
    ) {
        // Set the defaults
        this.onContactsChanged = new BehaviorSubject([]);
        this.onSelectedContactsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
        this.shopsRef = afs.collection(this.dbPath);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getShops(), this.getUserData()]).then(
                ([files]) => {
                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getShops();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getShops();
                    });

                    resolve();
                },
                reject
            );
        });
    }

    accpetedOrDeclined(key: string, statusType: any): Promise<any> {
        const params = {
            status: statusType
        };
        
        return this.shopsRef.doc(key || '').update(params);
    }

    getAuthoShopList(): Observable<any[]> {
        return this.shopsRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({
                    key: c.payload.doc.id,
                    ...c.payload.doc.data()
                }))
            )
        );
    }

    /**
     * Get shops
     *
     * @returns {Promise<any>}
     */
    getShops(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getAuthoShopList().subscribe(response => {
                this.shops = response;
                console.log(this.shops);
                if (this.filterBy === 'ACCEPTED') {
                    this.shops = this.shops.filter(_contact => {
                        return _contact.status === this.filterBy;
                    });
                }

                if (this.filterBy === 'DECLINED') {
                    this.shops = this.shops.filter(_contact => {
                        return _contact.status === this.filterBy;
                    });
                }

                if (this.searchText && this.searchText !== '') {
                    this.shops = FuseUtils.filterArrayByString(
                        this.shops,
                        this.searchText
                    );
                }

                this.shops = this.shops.map(contact => {
                    return new Shop(contact);
                });

                this.onContactsChanged.next(this.shops);
                resolve(this.shops);
            });
        });
    }

    /**
     * Get user data
     *
     * @returns {Promise<any>}
     */
    getUserData(): Promise<any> {
        return new Promise((resolve, reject) => {
            // this._httpClient.get('api/shops-user/5725a6802d10e277a0f35724')
            //     .subscribe((response: any) => {
            this.user = SampleUser;
            this.onUserDataChanged.next(this.user);
            resolve(this.user);
            // }, reject);
        });
    }

    /**
     * Toggle selected contact by id
     *
     * @param id
     */
    toggleSelectedShop(id): void {
        // First, check if we already have that contact as selected...
        if (this.selectedContacts.length > 0) {
            const index = this.selectedContacts.indexOf(id);

            if (index !== -1) {
                this.selectedContacts.splice(index, 1);

                // Trigger the next event
                this.onSelectedContactsChanged.next(this.selectedContacts);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedContacts.push(id);

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void {
        if (this.selectedContacts.length > 0) {
            this.deselectContacts();
        } else {
            this.selectContacts();
        }
    }

    /**
     * Select shops
     *
     * @param filterParameter
     * @param filterValue
     */
    selectContacts(filterParameter?, filterValue?): void {
        this.selectedContacts = [];

        // If there is no filter, select all shops
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedContacts = [];
            this.shops.map(contact => {
                this.selectedContacts.push(contact.id);
            });
        }

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    updateContact(contact): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post('api/shops-shops/' + contact.id, { ...contact })
                .subscribe(response => {
                    this.getShops();
                    resolve(response);
                });
        });
    }

    /**
     * Update user data
     *
     * @param userData
     * @returns {Promise<any>}
     */
    updateUserData(userData): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post('api/shops-user/' + this.user.id, { ...userData })
                .subscribe(response => {
                    this.getUserData();
                    this.getShops();
                    resolve(response);
                });
        });
    }

    /**
     * Deselect shops
     */
    deselectContacts(): void {
        this.selectedContacts = [];

        // Trigger the next event
        this.onSelectedContactsChanged.next(this.selectedContacts);
    }

    /**
     * Delete contact
     *
     * @param contact
     */
    deleteContact(contact): void {
        const contactIndex = this.shops.indexOf(contact);
        this.shops.splice(contactIndex, 1);
        this.onContactsChanged.next(this.shops);
    }

    /**
     * Delete selected shops
     */
    deleteSelectedContacts(): void {
        for (const contactId of this.selectedContacts) {
            const contact = this.shops.find(_contact => {
                return _contact.id === contactId;
            });
            const contactIndex = this.shops.indexOf(contact);
            this.shops.splice(contactIndex, 1);
        }
        this.onContactsChanged.next(this.shops);
        this.deselectContacts();
    }
}
