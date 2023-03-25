//DOM ELEMENTS

const canvas = document.querySelector("#canvas")
let startScreen = document.querySelector("#startScreen")

let button = document.querySelector("#button")
let overlay = document.querySelector("#overlay")
let startCard = document.querySelector("#startCard")
let overlay2 = document.querySelector("#overlay2")
let restartBtn = document.querySelector("#restartBtn")
let endCard = document.querySelector("#endCard")

//Canvas set up and resizing 
const ctx = canvas.getContext("2d") 
canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

// Creating Player
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
        this.moveLeft = false
        
    }
    
    render() {
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

//COMPUTER PLAYER 
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
//let obBlock = new obstacle (170, 230, 20, 20, "green", 1)

let obBlock5 = []

// CONTROLLER
document.addEventListener('keydown',  e => {
    console.log(e)
    if (e.code === "Space"){
        if(!jumper.shouldJump){ 
            jumper.jumpCounter = 0;
            jumper.shouldJump = true;
        }
    }
    if(e.key === "ArrowRight"){
            jumper.x += jumper.speed + 10
            jumper.moveRight= true
        
    }
    if (e.key === "ArrowLeft"){
        jumper.x -= jumper.speed
        jumper.moveRight = true
    }
    }
)

// BUTTIONS
let restart2 = button.onclick = function () {
    animate()
    console.log(overlay.style.visibility)
    
        overlay.style.visibility = "hidden";
}

//TIMER FUNCTION AND VARIABLES
let startTime = 15
let countDown = setInterval(() => {
    startTime--
}, 1000)
function timerBox(){
    ctx.fillStyle = "green";
    ctx.font = "bold 18px Arial";
    ctx.fillText(`Time Left: ${startTime}`, 400, 40);
    win()
}


// FUNCTIONS

function backgroundLine() {
    ctx.beginPath();
    ctx.moveTo(0, 250);//x=0 y=200line will start on the left
    ctx.lineTo(573, 250);//horizontal line 
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.stroke();
}
function getRandomNumber(min,max){
    return Math.floor(Math.random() * (max - min + 1 )) + min;
}

function generateBlocks() {
    let timeDelay = getRandomNumber(200, 10000);
 obBlock5.push(new obstacle(550, 230, 20, 20, "green", 1))

    setTimeout(generateBlocks, timeDelay)
}
// setTimeout(() => {
//     generateBlocks();
// }, getRandomNumber(1000))

let win = function win(){  if(startTime === 0){
    clearInterval(countDown)
    cancelAnimationFrame(animationId)
    // overlay2.style.visibility = "visible"
    // overlay2.style.textAlign = "center"
    // overlay2.style.color = "green"
}
}

function detectHit() {
    let i= obBlock5.length
    const left = obBlock5[0].x <= jumper.width + jumper.x
    const right = obBlock5[0].x + obBlock5[0].width >= jumper.x
    const top = obBlock5[0].y <= jumper.y + jumper.height
    const bottom = obBlock5[0].y + obBlock5[0].height >= jumper.y
    if (left && top && bottom && right) {
        let message = document.createElement("div")
        message.innerText= "You Lost"
        message.style.top= "21px"
        message.style.position= "absolute"
        message.style.color= "red"
        overlay.style.visibility = "visible"
        // overlay.style.color= "red"
        // overlay.style.textAlign= "center"
        overlay.innerText= ""
        let resetBtn = document.createElement("button")
        // resetBtn.innerHTML = "Reset"
        console.log(resetBtn)
        resetBtn.innerText= "Reset\n"
        resetBtn.style.position= "absolute"
        resetBtn.style.bottom= "10px"
        resetBtn.margin= "3px"
        resetBtn.addEventListener("click", () =>{
            console.log("yoo")
            
          //cancelAnimationFrame(animationId)
          //restart2
          //   // overlay2.style.visibility="hidden"
          overlay.style.visibility="hidden"
          //   animationId
          //   ctx.clearRect(0,0, canvas.width, canvas.height)
          //       getRandomNumber()
          //       generateBlocks()
          //timerBox()
          obBlock5
          obBlock5 = []
          //startTime = 15
        //   // animationId = requestAnimationFrame(animate)
        jumper = new player(20, 224, 25, 25, 'red', 10)
        animate()
        })
        overlay.append(message)
        overlay.append(resetBtn)

        
        return true
    } else {
        return false 
    }
}

const startGame = function startGame (){
    if (startTime === 15) {
        cancelAnimationFrame(animationId)
    } 
    //restart2
}

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
            obBlock5.shift()  
        }
     })

    }
    animate()

    setTimeout(() => {
       generateBlocks();
   }, getRandomNumber(1000))
   
    
   // animate()
   function restartGame () {
        //cancelAnimationFrame(animationId)
        startTime = 15
        //restart2
        // overlay2.style.visibility="hidden"
        // overlay.style.visibility="visible"
        animationId
        ctx.clearRect(0,0, canvas.width, canvas.height)
            getRandomNumber()
            generateBlocks()
            timerBox()
        // obBlock5
        obBlock5 = []
        // animationId = requestAnimationFrame(animate)
        jumper = new player(20, 224, 25, 25, 'red', 10)
      
            animate()


            setTimeout(() => {
                generateBlocks();
            }, getRandomNumber(1000))
        }

    