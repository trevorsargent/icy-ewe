import p5 from 'p5'

const sketch = (p) => {
	let gray = 0

	p.setup = () => {
		let cW = p.windowWidth
		let cH = p.windowHeight
		p.createCanvas(cW, cH)
	}

	p.draw = () => {
		p.background(gray)
		p.rect(p.width / 2 - 25, p.height / 2 - 25, 50, 50)
	}

	p.mousePressed = () => {
		gray = (gray + 16) % 256
	}
}

// See https://github.com/processing/p5.js/wiki/Instantiation-Cases
new p5(sketch) // 2nd param can be a canvas html element