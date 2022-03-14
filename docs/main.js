const canvas = document.getElementById("myCanvas")

let _W = window.innerWidth
let _H = window.innerHeight


const strcoords =(x, y)=>{
	return `${x}:${y}`
}


PIXI.settings.RESOLUTION = window.devicePixelRatio;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
	view: canvas,
	width: _W,
	height: _H,
})

app.autoDensity = true
app.renderer.resolution = window.devicePixelRatio
app.renderer.backgroundColor = 0x9effef

window.addEventListener('resize', ()=>{
	_W = window.innerWidth
	_H = window.innerHeight
	app.renderer.resize(_W, _H)
})

let cellSize = 30

let g = 0.02
let jumpForce = 0.3
let speed = 0.2

let X = 0
let Y = 5
let VY = 0

let Terrain = {}

const getT = (x, y) =>{
	return Terrain[strcoords(x, y)]
}


const terrain = new PIXI.Graphics()
terrain.beginFill(0x00ff00)

noise.seed(Math.random())
for(let i=-500; i<500; i++){
	const s = noise.simplex2(i/30, 0)
	const x = Math.floor(s*3)
	for(let j=-10; j<=x; j++){
		Terrain[strcoords(i, j)] = 1
		terrain.drawRect(i*cellSize, j*cellSize*-1, cellSize, cellSize)
	}
}
app.stage.addChild(terrain)
terrain.x = _W/2
terrain.y = _H/2


const playerTexture = PIXI.Texture.from("assets/player.png")
const player = new PIXI.Sprite(playerTexture)

player.width = 60
player.height = 60
player.anchor.set(0.5, 1)
player.position.set(_W/2+X*cellSize, _H/2-Y*cellSize)

app.stage.addChild(player)

const keys = {}

let lx, rx, dy, my, uy, colLx, colRx

const events = {
	ArrowLeft(){
		player.scale.x *= Math.abs(player.scale.x)/player.scale.x*-1
		if(!getT(colLx, uy) && !getT(colLx, my)){
			X -= speed
		}
	},
	ArrowRight(){
		player.scale.x *= Math.abs(player.scale.x)/player.scale.x
		if(!getT(colRx, uy) && !getT(colRx, my)){
			X += speed
		}
	},
	KeyZ(){
		if(getT(lx, dy) || getT(rx, dy)){
			if(VY == 0){
				VY = jumpForce
			}
		}
	}
}

window.addEventListener('keydown', (e)=>{
	keys[e.code] = true
})
window.addEventListener('keyup', (e)=>{
	keys[e.code] = null
})

const loop =()=>{
	//console.log(Y, VY)
	requestAnimationFrame(loop)
	_W = window.innerWidth
	_H = window.innerHeight

	terrain.x = _W/2 - X*cellSize
	player.x = _W/2
	player.y = _H/2 - Y*cellSize

	Y += VY

	lx = Math.floor(X-0.5)
	rx = Math.floor(X+0.5)
	dy = Math.floor(Y)
	my = Math.floor(Y+1)
	uy = Math.floor(Y+2)
	colLx = Math.floor(X-0.5-speed)
	colRx = Math.floor(X+0.5+speed)

	//gravitacja
	if(!(!getT(lx, dy) && !getT(rx, dy)) && Math.abs(Y-Math.floor(Y))<0.1){
		VY = 0
		Y = Math.floor(Y)
	}else{
		VY -= g
	}

	//na wierzch jeśli w bloku
	if(!(!getT(lx, my) && !getT(rx, my))){
		console.log(Y, Y-Math.floor(Y+1))
		Y += Math.abs(Y-Math.floor(Y+1))
		VY = 0
	}

	for(const i in events){
		if(keys[i]){
			events[i]()
		}
	}
}

loop()

