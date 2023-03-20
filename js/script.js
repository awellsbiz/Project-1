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

//using a funtion to draw the line. the code will be separate from other code. 

function backgroundLine() {
    ctx.beginPath();
    ctx.moveTo(0, 250);//x=0 y=200line will start on the left
    ctx.lineTo(573, 250);//horizontal line 
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

// need to animante the line to be repeatedly drawn. make a function out of it. Maybe loop it through. it creates an illusion- the drawings are being crated quickly




// create player- see canvas crawler code
// has its own class allowing the use of methods and fields with only the class and not the app
//pasing arguments in the constructor allows for customization. 

class player {
    constructor(x, y, height, width, color){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
    }
    
    render() {// function to draw and fill out on canvas...its "renders" it. may use draw() too
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
//to fill in the player make a player varialble and set a "new" player to pass arguments in that will be passed through the arguments above from player class and render function

let jumper = new player(20, 224, 25, 25, 'green');
// console.log(jumper)
function animate() {
    requestAnimationFrame(animate)//methos in JS to be called when ready to update animation-
    ctx.clearRect(0,0, canvas.width, canvas.height)//used to clear out the contents of previous frame
    
    backgroundLine();//got to call so that it will show-- this is a call back function!
    jumper.render()
}
animate()