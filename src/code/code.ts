console.clear()

function clone(val) {
	const type = typeof val
	if (val === null) {
		return null
	} else if (type === 'undefined' || type === 'number' || type === 'string' || type === 'boolean') {
		return val
	} else if (type === 'object') {
		if (val instanceof Array) {
			return val.map((x) => clone(x))
		} else if (val instanceof Uint8Array) {
			return new Uint8Array(val)
		} else {
			let o = {}
			for (const key in val) {
				o[key] = clone(val[key])
			}
			return o
		}
	}
	throw 'unknown'
}

function getTopFrame(frames: ReadonlyArray<SceneNode>) {
	return frames.reduce(function (prev, curr) {
		return prev.y < curr.y ? prev : curr
	})
}

function getLeftFrame(frames: ReadonlyArray<SceneNode>) {
	return frames.reduce(function (prev, curr) {
		return prev.x < curr.x ? prev : curr
	})
}

function getTopLeftFrame(frames: ReadonlyArray<SceneNode>) {
	return frames.reduce(function (prev, curr) {
		return prev.x < curr.x || prev.y < curr.y ? prev : curr
	})
}

let columnCount

function linkSlidesInColumn(frames) {
	for (let i = 0; i < frames.length; i++) {
		let slide = frames[i]
		let nextSlide = frames[i + 1]

		if (nextSlide) {
			// const newReactions = clone(val)
			slide.reactions = [
				{
					action: {
						type: 'NODE',
						destinationId: nextSlide.id,
						navigation: 'NAVIGATE',
						transition: null,
						preserveScrollPosition: false,
					},
					trigger: {
						type: 'ON_CLICK',
					},
				},
			]
		}
	}
}

// This function takes an array of frames and itterates through each column on the canvas

function itterateColumn(frames) {
	columnCount++

	let topLeftFrame = getTopLeftFrame(frames)

	// let row = frames
	// 	.filter((frame) => frame.y + frame.height / 2 <= topFrame.y + topFrame.height || frame == topFrame)
	// 	.sort((a, b) => a.x - b.x) as Array<SceneNode>

	let column = frames
		.filter((frame) => frame.x + frame.height / 2 <= topLeftFrame.x + topLeftFrame.height || frame == topLeftFrame)
		.sort((a, b) => a.y - b.y) as Array<SceneNode>

	const nextFrames = frames.filter((x) => {
		return column.indexOf(x) < 0
	})

	linkSlidesInColumn(column)

	if (nextFrames.length > 0) {
		const nextTopLeftFrame = getTopLeftFrame(nextFrames)
		const lastFrameInColumn = column[column.length - 1]

		lastFrameInColumn.reactions = [
			{
				action: {
					type: 'NODE',
					destinationId: nextTopLeftFrame.id,
					navigation: 'NAVIGATE',
					transition: null,
					preserveScrollPosition: false,
				},
				trigger: {
					type: 'ON_CLICK',
				},
			},
		]
		itterateColumn(nextFrames)
	} else {
		figma.closePlugin('Done')
	}
}

function getFrames(nodes) {
	return nodes.filter((node) => node.type == 'FRAME')
}

if (figma.currentPage.selection.length > 2) {
	itterateColumn(getFrames(figma.currentPage.selection))
	figma.closePlugin('Plugin run')
} else {
	figma.closePlugin('Please select more than one frame to link')
}
