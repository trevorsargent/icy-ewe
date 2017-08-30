import p5 from 'p5'

const sketch = (p) => {
	let gray = 0

	let cW = p.windowWidth
	let cH = p.windowHeight

	p.setup = () => {
		p.createCanvas(cW, cH)
	}

	p.draw = () => {
		p.background(255)
		p.textSize(20)
		p.text("Icy Ewe", cW / 2 - 25, cH / 2)
	}

	p.mousePressed = () => {
	}
}

new p5(sketch) // 2nd param can be a canvas html element