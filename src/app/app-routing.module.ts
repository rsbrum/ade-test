import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { CallbackComponent } from './core/callback.component';
import { AuthGuardService } from './core/auth-guard.service';

const routes: Routes = [
  { path: 'callback/:code', component: CallbackComponent },
  { path: '', loadChildren: './views/user-order/user-order.module#UserOrderModule' },
  { path: 'auth', loadChildren: './views/auth/auth.module#AuthModule'},
  { path: 'admin', loadChildren: './views/admin/admin.module#AdminModule', canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
