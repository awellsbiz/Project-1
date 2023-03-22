//grab all the elements that you will be using for the game and set some variables for them.

const canvas = document.querySelector("#canvas")
let startScreen = document.querySelector("#startScreen")
let startTime = 60
let button = document.querySelector("#button")
let overlay = document.querySelector("#overlay")
let startCard = document.querySelector("#startCard")


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
    constructor(x, y, height, width, color, speed){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
        //creating these jumping variables for the jumping action. I will put this into a function
        this.speed = speed
        this.jumpHeight = 12;//will begin y speed
        this.shouldJump = false;//boolean to compare wether the player should jump or not- will revers later in the code
        this.jumpCounter = 0;//will go up on each frame- allowing to stop animation
        this.moveRight = false
        
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



let jumper = new player(20, 224, 25, 25, 'red', 10);


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
        this.x -= this.slideSpeed
    }
}
let obBlock = new obstacle (170, 230, 20, 20, "green", 1)

// let obBlock2 = new obstacle (450, 230, 20, 20, "green", 2)
// let obBlock3 = new obstacle (550, 230, 20, 20, "green", 2)
// let obBlock4 = new obstacle (650, 230, 20, 20, "green", 2)
let obBlock5 = []//creating an array so that we can make a fuction / use random methods to make code dryer
let countDown = setInterval(() => {
    startTime--
    //ctx.innerText = startTime
}, 1000)

function startGame (){
    ctx.fontStyle = "blue"
    ctx.font = "bold 18px Arial";
    let message = ctx.fillText("PRESS ARROW KEY UP TO START", 100, 100)
    if (startTime === 60) {
        cancelAnimationFrame(animationId)
    } 
    let spaceBar = document.addEventListener("keydown", e => {
        if (e.code === "ArrowUp"){
            animate()
        }
})

}


function timerBox(){
    ctx.fillStyle = "green";
    ctx.font = "bold 18px Arial";
    ctx.fillText(`Time Left: ${startTime}`, 400, 40);
    if(startTime === 0){
        clearInterval(countDown)
        cancelAnimationFrame(animationId)
    }
}

function backgroundLine() {
    ctx.beginPath();
    ctx.moveTo(0, 250);//x=0 y=200line will start on the left
    ctx.lineTo(573, 250);//horizontal line 
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
}
//building out a random number function to use when needed to help generate new obstacles.

function getRandomNumber(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBlocks() {
    let timeDelay = getRandomNumber(800, 1400);
 obBlock5.push(new obstacle(550, 230, 20, 20, "green", 3))

    setTimeout(generateBlocks, timeDelay)
}


//obBlock5.pop(obBlock5[0])
function detectHit() {
    let i= obBlock5.length
    const left = obBlock5[0].x <= jumper.width + jumper.x
    const right = obBlock5[0].x + obBlock5[0].width >= jumper.x
    const top = obBlock5[0].y <= jumper.y + jumper.height
    const bottom = obBlock5[0].y + obBlock5[0].height >= jumper.y
    if (left && top && bottom && right) {
        return true
    } else {
        return false 
    }
}

let animationId = null;
function animate() {
   animationId = requestAnimationFrame(animate)//methos in JS to be called when ready to update animation-
    ctx.clearRect(0,0, canvas.width, canvas.height)//used to 
    backgroundLine();//got to call so that it will show-- this is a call back function!
    timerBox()
    jumper.render()
    startGame()

    if(obBlock5.length > 0 && obBlock5[0].x < jumper.x - 50)
    obBlock5.shift(); 

    obBlock5.forEach(obBlocks => {
        obBlocks.slide()
        obBlocks.render()
        if (detectHit()) {
            //collision logic-end the game here
            cancelAnimationFrame(animationId)
        }
     })
    }

    document.addEventListener('keydown',  e => {
        if (e.code === "Space"){
            if(!jumper.shouldJump){ 
                jumper.jumpCounter = 0;
                jumper.shouldJump = true;
            }
        }
        if(e.key === "ArrowRight"){
                jumper.x += jumper.speed + 20
                jumper.moveRight= true
            
        }
        }
    )
    
    setTimeout(() => {
        generateBlocks();
    }, getRandomNumber(1000))
    
    animate()
