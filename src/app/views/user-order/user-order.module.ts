import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOrderComponent } from './user-order.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './footer/footer.component';
import { UserOrderRoutingModule } from './user-order-routing.module';
import { HeaderComponent } from './header/header.component';
import { CardapioItemComponent } from './cardapio/cardapio-item/cardapio-item.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { CartItemComponent } from './cart-modal/cart-item/cart-item.component';
import { OpcionalModalComponent } from './cardapio/opcional-modal/opcional-modal.component';

@NgModule({
  declarations: [UserOrderComponent, CardapioComponent, BannerComponent, FooterComponent, HeaderComponent, CardapioItemComponent, CartModalComponent, CartItemComponent, OpcionalModalComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserOrderRoutingModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  entryComponents: [
    CartModalComponent,
    OpcionalModalComponent
  ]
})
export class UserOrderModule { }
