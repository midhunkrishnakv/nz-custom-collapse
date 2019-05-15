/**
 * Author: Midhun krishna.
 * Description: Custom ng-zorro collapse animation.
 * File: nz-custom-collapse component
 */

import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core';
import { NzCollapsePanelComponent } from './nz-custom-collapse-panel.component';

@Component({
  selector: 'nz-custom-collapse',
  exportAs: 'nzCustomCollapse',
  templateUrl: './nz-custom-collapse.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      nz-custom-collapse {
        display: block;
      }
    `
  ]
})
export class NzCollapseComponent {
  private listOfNzCollapsePanelComponent: NzCollapsePanelComponent[] = [];
  @Input() @InputBoolean() nzAccordion = false;
  @Input() @InputBoolean() nzBordered = true;

  addPanel(value: NzCollapsePanelComponent): void {
    this.listOfNzCollapsePanelComponent.push(value);
  }

  removePanel(value: NzCollapsePanelComponent): void {
    this.listOfNzCollapsePanelComponent.splice(this.listOfNzCollapsePanelComponent.indexOf(value), 1);
  }

  click(collapse: NzCollapsePanelComponent): void {
    if (this.nzAccordion && !collapse.nzActive) {
      this.listOfNzCollapsePanelComponent
        .filter(item => item !== collapse)
        .forEach(item => {
          if (item.nzActive) {
            item.nzActive = false;
            item.nzActiveChange.emit(item.nzActive);
            item.markForCheck();
          }
        });
    }
    collapse.nzActive = !collapse.nzActive;
    collapse.nzActiveChange.emit(collapse.nzActive);
  }
}