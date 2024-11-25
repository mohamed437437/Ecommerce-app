import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductComponent } from './pages/admin/product/product.component';

export const routes: Routes = [

  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'


  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:LayoutComponent,
    children:[
      {
        path:'products',
        component: ProductComponent
      }
    ]
  }



];
