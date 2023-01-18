import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HighchartsChartModule } from 'highcharts-angular';

import { CampaignRoutingModule } from './campaign.routing.module';
import { CampaignOwnerComponent } from './pages/campaign-owner/campaign-owner.component';
import { CampaignOwnersComponent } from './pages/campaign-owners/campaign-owners.component';
import { CampaignHomeComponent } from './pages/campaign-home/campaign-home.component';
import { OwnerSettingsComponent } from './pages/owner-settings/owner-settings.component';
import { OwnerCampaignComponent } from './pages/owner-campaign/owner-campaign.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CampaignRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTooltipModule,
    HighchartsChartModule
  ],
  declarations: [
    CampaignHomeComponent,
    CampaignOwnerComponent,
    CampaignOwnersComponent,
    OwnerSettingsComponent,
    OwnerCampaignComponent,
  ],
  providers: [
  ],
})
export class CampaignModule { }
