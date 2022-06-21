import { DeviceComponent } from './core/components/panel/device/device.component';
import { MessagesComponent } from './core/components/panel/messages/messages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeviceComponent } from './core/components/panel/add-device/add-device.component';
import { DeleteDeviceComponent } from './core/components/panel/delete-device/delete-device.component';
import { DeletePointsComponent } from './core/components/panel/delete-points/delete-points.component';
import { DevicesComponent } from './core/components/panel/devices/devices.component';
import { GuardUserMustBeLoggedIn } from './core/guards/GuardUserMustBeLoggedIn';
import { MapComponent } from './shared/pages/map/map.component';
import { AccountsettingsComponent } from './core/components/account/accountsettings/accountsettings.component';
import { EmailconfirmationComponent } from './core/components/account/emailconfirmation/emailconfirmation.component';
import { ForgotpasswordComponent } from './core/components/account/forgotpassword/forgotpassword.component';
import { LoginComponent } from './core/components/account/login/login.component';
import { MobileconfirmationComponent } from './core/components/account/mobileconfirmation/mobileconfirmation.component';
import { RegisterComponent } from './core/components/account/register/register.component';
import { GuardUserMustBeLoggedOut } from './core/guards/GuardUserMustBeLoggedOut';

const routes: Routes = [

   //Redirect Home 
   { path: '', redirectTo: 'panel/devices', pathMatch: 'full' },

  {
    path: 'map',
    component: MapComponent,
    data: {
      title: 'Map',
    },
  },


  //User Account Routes
{
  path: 'register',
  component: RegisterComponent,
  data: {
    title: 'Register',
  },
  canActivate:[GuardUserMustBeLoggedOut] 
},
{ 
  path: 'login',
  component: LoginComponent,
  data: {
      title: 'Login',
    },
    // canActivate:[GuardUserMustBeLoggedOut]
},
{
  path: 'forgotpassword',
  component: ForgotpasswordComponent,
  data: {
    title: 'ForgotPassword',
  },
  canActivate:[GuardUserMustBeLoggedOut]
},
{
  path: 'mobileconfirmation',
  component: MobileconfirmationComponent,
  data: {
    title: 'MobileConfirmation',
  },
  canActivate:[GuardUserMustBeLoggedOut]
},
{
  path: 'emailconfirmation',
  component: EmailconfirmationComponent,
  data: {
    title: 'EmailConfirmation',
  },
},
{
  path: 'accountsettings',
  component: AccountsettingsComponent,
  data: {
    title: 'AccountSettings',
  },
  canActivate:[GuardUserMustBeLoggedIn]
},



   //User Panel
   {
    path: 'panel/devices',
    component: DevicesComponent,
    data: {
      title: 'MyDevices',
    },
    canActivate:[GuardUserMustBeLoggedIn]
  },
  {
    path: 'panel/devices/:filter',
    component: DevicesComponent,
    data: {
      title: 'MyDevices',
    },
    canActivate:[GuardUserMustBeLoggedIn]
  },

  {
    path: 'panel/device/:id',
    component: DeviceComponent,
    data: {
      title: 'DeviceInformation',
    },
    canActivate:[GuardUserMustBeLoggedIn]
  },
  {
    path: 'panel/add',
    component: AddDeviceComponent,
    data: {
      title: 'AddDevice',
    },
    canActivate:[GuardUserMustBeLoggedIn]
  },
  {
    path: 'panel/deletepoints/:id',
    component: DeletePointsComponent,
    data: {
      title: 'DeletePoints',
    },
    canActivate:[GuardUserMustBeLoggedIn]
  },
  {
    path: 'panel/deletedevice/:id',
    component: DeleteDeviceComponent,
    data: {
      title: 'RemoveDevice',
    },
    canActivate:[GuardUserMustBeLoggedIn]
  },
  {
    path: 'panel/messages',
    component: MessagesComponent,
    data: {
      title: 'Messages',
    },
    canActivate:[GuardUserMustBeLoggedIn]
  },
  {
    path: 'panel/messages/:filter',
    component: MessagesComponent,
    data: {
      title: 'Messages',
    },
    canActivate:[GuardUserMustBeLoggedIn]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
