import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserOrderComponent } from './user-order.component';


const routes: Routes = [{
  path: '',
  component: UserOrderComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserOrderRoutingModule {
}