import { FuseUtils } from '@fuse/utils';

export interface IShopLocation {
    latitude: number;
    longitude: number;
}


export class Shop
{

    uid: string;
    isRegisteredShop: boolean;
    status: boolean | string;
    email: string;
    mainName: string;
    secondaryName: string;
    mainContact: string;
    emailAddress: string;
    secondaryContact: string;
    writtenAddress: string;
    location: any;
    functionalLocation: IShopLocation;
    id: string;

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id || '';
            this.uid = contact.uid || FuseUtils.generateGUID();
            this.isRegisteredShop = contact.name || '';
            this.status = contact.lastName || '';
            this.email = contact.email || '';
            this.mainName = contact.mainName || '';
            this.secondaryName = contact.secondaryName || '';
            this.mainContact = contact.mainContact || '';
            this.emailAddress = contact.emailAddress || '';
            this.secondaryContact = contact.secondaryContact || '';
            this.writtenAddress = contact.writtenAddress || '';
            this.location = contact.location || '';
            this.functionalLocation = contact.functionalLocation || {};
        }
    }
}
