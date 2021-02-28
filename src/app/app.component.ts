import { Component, ViewEncapsulation } from '@angular/core';
import { CommonService } from './services/common.service';
import { boundingBox } from './constants';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.styl'],
	encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {

	public boundingBox = boundingBox;

	constructor(public commonService: CommonService) {}
}
