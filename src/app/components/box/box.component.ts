import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Box } from '../../constants';
import { CommonService } from '../../services/common.service';

@Component({
	selector: 'app-box',
	templateUrl: './box.component.html',
	styleUrls: ['./box.component.styl'],
	encapsulation: ViewEncapsulation.ShadowDom
})
export class BoxComponent {

	@Input() data: Box;

	constructor(private commonService: CommonService) {}

	setHighlight(): void {
		this.commonService.setHighlight(this.data?.id);
	}
}
