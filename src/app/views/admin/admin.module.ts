import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
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
  MatTreeModule, } from '@angular/material';

import { HomeComponent } from './home/home.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutosTableComponent } from './produtos/produtos-table/produtos-table.component';
import { AddProdutoModalComponent } from './produtos/add-produto-modal/add-produto-modal.component';
import { EditProdutoModalComponent } from './produtos/edit-produto-modal/edit-produto-modal.component';
import { DeleteProdutoModalComponent } from './produtos/delete-produto-modal/delete-produto-modal.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidosTableComponent } from './pedidos/pedidos-table/pedidos-table.component';
import { AddPedidoModalComponent } from './pedidos/add-pedido-modal/add-pedido-modal.component';
import { EditPedidoModalComponent } from './pedidos/edit-pedido-modal/edit-pedido-modal.component';
import { DeletePedidoModalComponent } from './pedidos/delete-pedido-modal/delete-pedido-modal.component';
import { PedidosPendentesTableComponent } from './home/pedidos-pendentes-table/pedidos-pendentes-table.component';
import { OpcionaisTableComponent } from './produtos/opcionais-table/opcionais-table.component';
import { AddOpcionalModalComponent } from './produtos/opcionais-table/add-opcional/add-opcional.component';
import { SaboresTableComponent } from './produtos/sabores-table/sabores-table.component';
import { AddSaborModalComponent } from './produtos/sabores-table/add-sabor-modal/add-sabor-modal.component';

@NgModule({
  declarations: [AdminComponent, HomeComponent, ProdutosComponent, ProdutosTableComponent, AddProdutoModalComponent, EditProdutoModalComponent, DeleteProdutoModalComponent, PedidosComponent, PedidosTableComponent, AddPedidoModalComponent, EditPedidoModalComponent, DeletePedidoModalComponent, PedidosPendentesTableComponent, OpcionaisTableComponent, AddOpcionalModalComponent, SaboresTableComponent, AddSaborModalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    ReactiveFormsModule
  ],
  entryComponents: [
    EditProdutoModalComponent,
    AddProdutoModalComponent,
    DeleteProdutoModalComponent,
    AddOpcionalModalComponent,
    AddSaborModalComponent
  ]
})

export class AdminModule {

}
