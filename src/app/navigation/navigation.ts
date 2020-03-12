import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Menus',
        type     : 'group',
        children : [
            {
                id       : 'list-of-shops',
                title    : 'list of shops',
                type     : 'item',
                icon     : 'email',
                url      : '/list-of-shops',
                badge    : {
                    title    : '25',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    }
];
