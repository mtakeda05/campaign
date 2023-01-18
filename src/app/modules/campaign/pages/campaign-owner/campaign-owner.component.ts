import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'campaign-owner',
  templateUrl: './campaign-owner.component.html',
  styleUrls: ['./campaign-owner.component.scss']
})
export class CampaignOwnerComponent implements OnInit {
  ownerId: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ownerId = params['id'];
    });
  }

  onBack() {
    this.router.navigate(['/campaign']);
  }
}
