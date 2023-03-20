//psudo code for canvas element
//grab all the elements that you will be using for the game and set some variables for them.

const canvas = document.querySelector("#canvas")
let timer = document.querySelector("#timer")

//set up the canvas. the .getContex allows the use of all the tools of canvas. like creating shapes and such

const ctx = canvas.getContext("2d")

//got to then resize the canvas- ask the DOM the size of the canvas and set the resolution to be that size. 

canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

// console.log(ctx)

//create player- making a rectangle

// ctx.fillStyle = "green"
// ctx.fillRect(30, 30, 50, 50)

const player = {
    height: 30,
    width: 30,
    jumping: true,
    x: 0,
    y: 0,
    xVelocity: 0,
    yVelocity: 0

}

function controller(e) {
    const speed= 10
    switch(e.key) {
        case "ArrowRight":
            player.x += speed
            break
        case "SpaceBar":
            player.y += speed * 2
    }
}
