const canvas = document.getElementById("myCanvas")

let _W = window.innerWidth
let _H = window.innerHeight

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

const playerTexture = PIXI.Texture.from("assets/knight.png")
const player = new PIXI.Sprite(playerTexture)

player.width = 100
player.height = 100
player.anchor.set(0.5)
player.position.set(_W/2, _H/2)

app.stage.addChild(player)