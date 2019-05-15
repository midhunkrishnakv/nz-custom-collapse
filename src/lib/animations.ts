import { trigger, state, style, transition, animate } from '@angular/animations';

var EASE_OUT = 'cubic-bezier(0, 0.91, 0.83, 0.99)';

export var customCollapse = trigger('collapseMotion', [
    state('expanded', style({ height: '*' })),
    state('collapsed', style({ height: 0, overflow: 'hidden' })),
    state('hidden', style({ height: 0, display: 'none' })),
    transition('expanded => collapsed', animate("400ms " + EASE_OUT)),
    transition('expanded => hidden', animate("400ms " + EASE_OUT)),
    transition('collapsed => expanded', animate("400ms " + EASE_OUT)),
    transition('hidden => expanded', animate("400ms " + EASE_OUT))
])