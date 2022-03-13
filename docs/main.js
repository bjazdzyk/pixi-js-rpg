const canvas = document.getElementById("myCanvas")

const app = new PIXI.Application({
	view: canvas,
	width: window.innerWidth,
	height: window.innerHeight
})

window.addEventListener('resize', ()=>{
	app.renderer.resize(window.innerWidth, window.innerHeight)
})