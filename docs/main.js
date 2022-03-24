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

let cellSize = 6

let Terrain = {}

const getT = (x, y) =>{
	return Terrain[strcoords(x, y)]
}


const terrain = new PIXI.Graphics()

noise.seed(Math.random())
for(let i=-400; i<400; i++){
	const s = noise.simplex2(i/300, 0) // -1 <-> 1
	const x = s*50
	console.log(x)

	Terrain[i] = x*cellSize

	terrain.lineStyle(cellSize, 0x000000)
	terrain.moveTo(i*cellSize, x*cellSize)
	terrain.lineTo(i*cellSize, x*cellSize+Math.floor(cellSize/2+1))
	terrain.lineStyle(cellSize, 0x00ff00)
	terrain.moveTo(i*cellSize, x*cellSize+Math.floor(cellSize/2+1))
	terrain.lineTo(i*cellSize, x*cellSize+1000)
}
app.stage.addChild(terrain)
terrain.x = _W/2
terrain.y = _H/2

const keys = {}

const events = {
	// ArrowLeft(){
	// 	player.scale.x *= Math.abs(player.scale.x)/player.scale.x*-1
	// 	if(!getT(colLx, uy) && !getT(colLx, my)){
	// 		X -= speed
	// 	}
	// }
}

window.addEventListener('keydown', (e)=>{
	keys[e.code] = true
})
window.addEventListener('keyup', (e)=>{
	keys[e.code] = null
})

const loop =()=>{
	requestAnimationFrame(loop)
	_W = window.innerWidth
	_H = window.innerHeight

	terrain.x = _W/2
	for(const i in events){
		if(keys[i]){
			events[i]()
		}
	}
}

loop()

