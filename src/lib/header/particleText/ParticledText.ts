
export default function init(text: string, canvas: HTMLCanvasElement, config?: {
	size?: number;
	color?: string;
	font?: string;
	textCoordinates?: {
		width?: number;
		height?: number
	};
}) {
	const ctx = canvas.getContext('2d');
	let particleArray = [];
	let adjustX = 1;
	let adjustY = 2;
	const particleAttributes = {
		size : config?.size ?? 1.8,
		color: config?.color ?? 'gold',
		kerning: 5,
		returnLag: 25,
	}

	const mouse = {
		x: null,
		y: null,
		radius: 20
	}
	const width = canvas.width;
	ctx.font = config?.font ?? `${(width / 50) + 4}px sans-serif`;
	ctx.fillText(text, width / 22, width / 50);
	const coordsConfig = {
		w: config?.textCoordinates?.width ?? width / 5,
		h: config?.textCoordinates?.height ?? width / 20
	}
	const textCoordinates = ctx.getImageData(0, 0, coordsConfig.w, coordsConfig.h);

	window.addEventListener('mousemove',
		(event) => {
			mouse.x = event.x - canvas.getBoundingClientRect().x;
			mouse.y = event.y - canvas.getBoundingClientRect().y;
		}
	)
	window.addEventListener("touchmove", 
		(event) => {
			let touch = event.touches[0];
			mouse.x = touch.clientX;
			mouse.y = touch.clientY;
		}
	)
	class Particle {
		x: number;
		y: number;
		size: number;
		baseX: number;
		baseY: number;
		density: number;
		constructor(x: number,y: number) {
			this.x = x;
			this.y = y;
			this.size = particleAttributes.size;
			this.baseX = this.x;
			this.baseY = this.y;
			this.density = (Math.random() * 30) + 1;
		}
		draw() {
			ctx.fillStyle = particleAttributes.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
			ctx.closePath();
			ctx.fill();
		}
		update() {
			let dx = mouse.x - this.x;
			let dy = mouse.y - this.y; 
			let distance =  Math.sqrt(dx * dx + dy * dy);
			let forceDirectionX = dx / distance;
			let forceDirectionY = dy / distance;
			let maxDistance = mouse.radius;
			let force = (maxDistance - distance) / maxDistance;
			let directionX = forceDirectionX * force * this.density;
			let directionY = forceDirectionY * force * this.density;
	
			if (distance < mouse.radius) {
				this.x -= directionX; 
				this.y -= directionY;
				
			} else {
				if (this.x != this.baseX) {
					let dx = this.x - this.baseX;
					this.x -= dx / particleAttributes.returnLag
				}
				if (this.y != this.baseY) {
					let dy = this.y - this.baseY;
					this.y -= dy / particleAttributes.returnLag
				}
			}
		}
	}
	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < particleArray.length; i++) {
			particleArray[i].draw();
			particleArray[i].update();
		}
		requestAnimationFrame(animate); 
	}
	
	particleArray = [];
	for(let y = 0; y < textCoordinates.height; y++) {
		for(let x = 0; x < textCoordinates.width; x++) {
			if (textCoordinates.data[(y * 4 * textCoordinates.width) +(x*4) + 3] > 128) {
				let postionX = x + adjustX;
				let positionY = y  + adjustY;
				particleArray.push(new Particle(postionX * particleAttributes.kerning, positionY * particleAttributes.kerning))
				
			}
		}
	}
	animate(); 
}

