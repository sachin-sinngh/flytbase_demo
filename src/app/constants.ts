export interface Box {
	id: number;
	highlight: boolean;
	side: number;
	position: {
		top: number;
		left: number;
	};
}

export const boxSide = 100;
export const boundingBox = {
	width: 500,
	height: 200
};

export const boxMoveStep = 1;
