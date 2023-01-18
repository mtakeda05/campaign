import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Owner } from '../../interfaces/owner.interface';
import { CampaignOwnerService } from '../../services/campaign-owners.service';

@Component({
  selector: 'campaign-owners',
  templateUrl: './campaign-owners.component.html',
  styleUrls: ['./campaign-owners.component.scss']
})
export class CampaignOwnersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  displayedColumns = ['name', 'email', 'customers', 'actions'];
  dataSource = new MatTableDataSource<Owner>();  

  constructor(private ownerService: CampaignOwnerService) { }

  ngOnInit() {
    this.getOwners();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  getOwners(): void {
    this.ownerService.getOwners()
      .subscribe(owners => this.dataSource.data = owners);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
