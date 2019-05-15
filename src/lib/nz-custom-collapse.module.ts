/**
 * Author: Midhun krishna.
 * Description: Custom ng-zorro collapse animation.
 * File: Main Module
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAddOnModule } from 'ng-zorro-antd/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzCollapsePanelComponent } from './nz-custom-collapse-panel.component';
import { NzCollapseComponent } from './nz-custom-collapse.component';

@NgModule({
  declarations: [NzCollapsePanelComponent, NzCollapseComponent],
  exports: [NzCollapsePanelComponent, NzCollapseComponent],
  imports: [CommonModule, NzIconModule, NzAddOnModule]
})
export class NzCustomCollapseModule {}
