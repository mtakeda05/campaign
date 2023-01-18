import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CampaignOwnerService } from '../../services/campaign-owners.service';
import { Owner } from '../../interfaces/owner.interface';

@Component({
  selector: 'owner-settings',
  templateUrl: './owner-settings.component.html',
  styleUrls: ['./owner-settings.component.scss']
})
export class OwnerSettingsComponent implements OnInit {
  @Input() ownerId: string = '';
  settingsForm: FormGroup;
  owners: Owner[] = [];

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private ownerService: CampaignOwnerService
  ) {
    this.settingsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.ownerService.getOwners().subscribe(
      owners => {
        this.owners = owners;
        const owner = this.owners.find(item => item.id === this.ownerId);
        if (owner) {
          this.settingsForm.setValue({
            'name': owner.name,
            'email': owner.email
          })
        }
      }
    );
  }

  onSave() {
    const owner = this.owners.find(item => item.id === this.ownerId);
    if (owner) {
      owner.name = this.settingsForm.get('name')?.value;
      owner.email = this.settingsForm.get('email')?.value;
      this._snackBar.open('Data updated', '', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }
  }
}
