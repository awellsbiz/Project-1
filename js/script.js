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
        //creating these jumping variables for the jumping action. I will put this into a function
        this.jumpHeight = 12;//will begin y speed
        this.shouldJump = false;//boolean to compare wether the player should jump or not- will revers later in the code
        this.jumpCounter = 0;//will go up on each frame- allowing to stop animation
        this.jumpUp = true;
        
    }
    
//32 frmaes is good for jumping- makes the animation smooth- 14 frames for up 4 frames stationed in the air and 14 for coming down

render() {// function to draw and fill out on canvas...its "renders" it. may use draw() too
    this.jump()
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}
jump() {
    if(this.shouldJump){
        this.jumpCounter++;
        if(this.jumpCounter < 15) {
        this.y -= this.jumpHeight;
    }else if(this.jumpCounter > 14 && this.jumpCounter < 19) {
        this.y += 0;
    }else if(this.jumpCounter < 33){
        this.y += this.jumpHeight;
    }
    if(this.jumpCounter >= 32){
        this.shouldJump = false;
    }
    console.log(this.shouldJump, this.jumpCounter, this.jumpHeight)
    }

}
}



let jumper = new player(20, 224, 25, 25, 'red');


class obstacle {
    constructor(x, y, width, height, color, speed){
        this.x = x
        this.y = y
        this.width = width;
        this.height = height;
        this.color = color;
        this.slideSpeed = speed;
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    slide() {
        this.draw();
        this.x -= this.slideSpeed
    }
}
let obBlock = new obstacle (170, 209, 40, 40, "green", 5)
console.log(obBlock)

function backgroundLine() {
    ctx.beginPath();
    ctx.moveTo(0, 250);//x=0 y=200line will start on the left
    ctx.lineTo(573, 250);//horizontal line 
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function animate() {
    requestAnimationFrame(animate)//methos in JS to be called when ready to update animation-
    ctx.clearRect(0,0, canvas.width, canvas.height)//used to clear out the contents of previous frame
    backgroundLine();//got to call so that it will show-- this is a call back function!
    jumper.render()
    obBlock.render()
}
addEventListener('keydown',  e => {
    if (e.code === "Space"){
        if(!jumper.shouldJump){
            jumper.jumpCounter = 0;
            jumper.shouldJump = true;
        }
        console.log(e)
    }
})

animate()

// let newObstacles =[]


//to fill in the player make a player varialble and set a "new" player to pass arguments in that will be passed through the arguments above from player class and render function

//need to call the render function before the player/'jumper' has drawn to the canvas- makes the jump visibly seen by the user

// console.log(jumper)

//moved function down here and added jumper/'player' render funtion inside that scope. I was calling the animate but the render was happening  out of scope. and not showing square. 




// jump() {
// if(this.shouldJump){
//     this.jumpCounter++;
//     if(this.jumpCounter < 15)
//     this.y -= this.jumpHeight;
// }else if(this.jumpCounter > 14 && this.jumpCounter < 19){
//     this.y += 0;
// }else if(this.jumpCounter < 33){
//     this.y =+ this.jumpHeight;
// }
// if(this.jumpCounter >= 32){
//     this.shouldJump = false;
// }
// };
//everything in the class is is in the animation scope. callbacks are running through that function.
// render() {
//     this.jump()
//     ctx.fillStyle = this.color
//     ctx.fillRect(this.x, this.y, this.height, this.width)
// }

// accsessing event listener from the window- will trigger call back

