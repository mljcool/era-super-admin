import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { ListOfShopsComponent } from './list-of-shops.component';
import { ShopListService } from './list-of-shops.service';
import { ShopListRenderComponent } from './shop-list/shop-list.component';
import { ShopMainSidebarComponent } from './sidebars/main/main.component';
import { ShopssSelectedBarComponent } from './selected-bar/selected-bar.component';
import { ShopFormDialogComponent } from './shop-form/shop-form.component';


const routes: Routes = [
    {
        path: '**',
        component: ListOfShopsComponent,
        resolve: {
            contacts: ShopListService
        }
    }
];

@NgModule({
    declarations: [
        ListOfShopsComponent,
        ShopListRenderComponent,
        ShopssSelectedBarComponent,
        ShopMainSidebarComponent,
        ShopFormDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers: [ShopListService],
    entryComponents: [ShopFormDialogComponent]
})
export class ListOfShopModule {}
