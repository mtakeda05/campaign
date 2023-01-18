import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignOwnersComponent } from './pages/campaign-owners/campaign-owners.component';
import { CampaignHomeComponent } from './pages/campaign-home/campaign-home.component';
import { CampaignOwnerComponent } from './pages/campaign-owner/campaign-owner.component';

const routes: Routes = [
  {        
    path: '',
    component: CampaignHomeComponent,
    children: [
      {
        path: '',
        component: CampaignOwnersComponent,
      },
      {
          path: ':id/owner',
          component: CampaignOwnerComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }