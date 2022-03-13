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


let speed = 3
let X = 0
let Y = 0
let cellSize = 30

let Terrain = {}


const terrain = new PIXI.Graphics()
terrain.beginFill(0x00ff00)

noise.seed(Math.random())
for(let i=-20; i<=20; i++){
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
player.anchor.set(0.5)
player.position.set(_W/2+X*cellSize, _H/2+Y*cellSize*-1)

app.stage.addChild(player)

const keys = {}
const events = {
	ArrowUp(){
		player.y -= speed
	},
	ArrowDown(){
		player.y += speed
	},
	ArrowLeft(){
		player.x -= speed
		player.scale.x *= Math.abs(player.scale.x)/player.scale.x*-1
	},
	ArrowRight(){
		player.x += speed
		player.scale.x *= Math.abs(player.scale.x)/player.scale.x
	}
}

window.addEventListener('keydown', (e)=>{
	keys[e.code] = true
})
window.addEventListener('keyup', (e)=>{
	keys[e.code] = null
})

const loop =()=>{
	requestAnimationFrame(loop)
	for(const i in events){
		if(keys[i]){
			events[i]()
		}
	}
}

loop()

