/**
 * Author: Midhun krishna.
 * Description: Custom ng-zorro collapse animation.
 * File: nz-custom-collapse-panel component
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean } from 'ng-zorro-antd/core';
import * as Animations from '../lib/animations';
import { NzCollapseComponent } from './nz-custom-collapse.component';

@Component({
  selector: 'nz-custom-collapse-panel',
  exportAs: 'nzCustomCollapsePanel',
  templateUrl: './nz-custom-collapse-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [Animations.customCollapse],
  styles: [
    `
        nz-custom-collapse-panel {
          display: block;
        }
      `
  ],
  host: {
    '[class.ant-collapse-no-arrow]': '!nzShowArrow'
  }
})
export class NzCollapsePanelComponent implements OnInit, OnDestroy {
  @Input() @InputBoolean() @HostBinding('class.ant-collapse-item-active') nzActive = false;
  @Input() @InputBoolean() @HostBinding('class.ant-collapse-item-disabled') nzDisabled = false;
  @Input() @InputBoolean() nzShowArrow = true;
  @Input() nzExtra: string | TemplateRef<void>;
  @Input() nzHeader: string | TemplateRef<void>;
  @Input() nzExpandedIcon: string | TemplateRef<void>;
  @Input() nzAnimations: string | TemplateRef<void>;
  @Output() readonly nzActiveChange = new EventEmitter<boolean>();

  clickHeader(): void {
    if (!this.nzDisabled) {
      this.nzCollapseComponent.click(this);
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    @Host() private nzCollapseComponent: NzCollapseComponent,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-collapse-item');
  }

  ngOnInit(): void {
    this.nzCollapseComponent.addPanel(this);
  }

  ngOnDestroy(): void {
    this.nzCollapseComponent.removePanel(this);
  }
}