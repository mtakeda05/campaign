import { Component, OnInit } from '@angular/core';

import { Owner } from '../../interfaces/owner.interface';
import { CampaignOwnerService } from '../../services/campaign-owners.service';

@Component({
  selector: 'campaign-home',
  templateUrl: './campaign-home.component.html',
  styleUrls: ['./campaign-home.component.scss']
})
export class CampaignHomeComponent implements OnInit {
  owners: Owner[] = [];

  constructor(private ownerService: CampaignOwnerService) { }

  ngOnInit() {
    this.getOwners();
  }

  getOwners(): void {
    this.ownerService.getOwners()
      .subscribe(owners => this.owners = owners);
  }
}
