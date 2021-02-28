import { Injectable, ApplicationRef } from '@angular/core';
import { Box, boundingBox, boxSide, boxMoveStep } from '../constants';

@Injectable({
	providedIn: 'root'
})
export class CommonService {

	public boxes: Box[] = [];
	public keyboardControlsOn = false;
	private highlightedBoxIndex = -1;
	private highlightedBox: Box = null;

	constructor(private appRef: ApplicationRef) {
		this.toggleKeyboardControls();
	}

	public setHighlight(id: number): void {
		this.boxes.forEach((d, index) => {
			d.highlight = d.id === id;
			// highlightedBoxIndex --> index needed for deletion
			if (d.highlight) {
				this.highlightedBoxIndex = index;
				this.highlightedBox = d;
			}
		});

		// trigger change detection by changing array reference
		this.boxes = [...this.boxes];

		this.appRef.tick();
	}

	public addBox(count: number = 1): void {
		// fetch last item
		let lastBox: Box = this.boxes.length ? this.boxes[this.boxes.length - 1] : null;
		let lastID = lastBox ? lastBox.id : 0;
		for (; count > 0; count--) {
			// increase id
			lastID++;
			// set position - top
			let top = lastBox ? lastBox.position.top + 10 : lastID * 10;
			// keep box in bounds
			top = top + boxSide < boundingBox.height ? top : 0;
			// set position - left
			let left = lastBox ? lastBox.position.left + 10 : lastID * 10;
			// keep box in bounds
			left = left + boxSide < boundingBox.width ? left : 0;

			// reset last box
			lastBox = {
				highlight: false,
				id: lastID,
				position: {
					top,
					left,
				},
				side: boxSide
			};
			// add to list
			this.boxes.push(lastBox);
		}
		this.appRef.tick();
	}

	public toggleKeyboardControls(): void {
		this.keyboardControlsOn = !this.keyboardControlsOn;

		// attach or detach listener as per control
		if (this.keyboardControlsOn) {
			document.body.addEventListener('keydown', (e) => this.handleKeyEvent(e));
		} else {
			document.body.removeEventListener('keydown', (e) => this.handleKeyEvent(e));
		}

		this.appRef.tick();
	}

	private handleKeyEvent(e: KeyboardEvent): void {
		if (this.keyboardControlsOn &&
			typeof e.key === 'string' &&
			this.highlightedBoxIndex !== -1 &&
			this.highlightedBox !== null) {
			
			// change pos
			let top = this.highlightedBox.position.top;
			let left = this.highlightedBox.position.left;
			switch (e.key?.toLowerCase()) {
				// move up
				case 'arrowup':
				case 'w':
					top -= boxMoveStep;
					break;
				// move down
				case 'arrowdown':
				case 's':
					top += boxMoveStep;
					break;
				// move left
				case 'arrowleft':
				case 'a':
					left -= boxMoveStep;
					break;
				// move right
				case 'arrowright':
				case 'd':
					left += boxMoveStep;
					break;
				// delete
				case 'delete':
					this.boxes.splice(this.highlightedBoxIndex, 1);
					// reset highlighted
					this.highlightedBoxIndex = -1;
					this.highlightedBox = null;
					break;
				default:
					break;
			}

			// bound the box in border, subtracting 4 as the border width of box + border width of bounding box
			if (top > 0 && (top + this.highlightedBox.side) < (boundingBox.height - 4)) {
				this.highlightedBox.position.top = top;
			}
			if (left > 0 && (left + this.highlightedBox.side) < (boundingBox.width - 4)) {
				this.highlightedBox.position.left = left;
			}
			this.appRef.tick();
		}
	}
}
