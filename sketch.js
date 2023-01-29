//variables for position/speed of ship  
let shipX;
let shipY;
let shipAngle;
let shipSpeed;
let visible2 = true
//opponent 
let x = [30,130, 230, 330,360];
let y = [390, 250, 300, 150, 20];

let speedY = [-0.25,-0.25,-0.25,-0.25,-0.25, -0.25]
let speedX = [-0.25,-0.25,-0.25,-0.25,-0.25, -0.25];
let visible = [true, true, true, true, true ];
let collided = [false, false, false, false, false];
let collidedpoints = 0
//health, points, and powerups 
let points = 0
let healthX = 50
let healthY = 50
let healthspeed = -2
let healthspeedY = -1
let healthVisible = true
//variables for position/speed of laser
let laserX = []
let laserY = [] 
let laserAngle=[] 
let laserSpeed; 
let timer = 0;

function setup() {
  
  createCanvas(400, 400);

  //initial values for the player's ship 
  shipX = 200;  
  shipY = 200; 
  shipAngle = PI + HALF_PI;  //pointing up 
  shipSpeed = 0.0; 

  //laser is initially way off screen so it doesn't hit anything
 
  laserSpeed = 3.0;
  
} //<-- end setup() function 



function draw() {
  
  background(0);
  //rules
  if(timer > 0 && timer < 100){
    noStroke()
    fill('yellow')
    text("get rid of the asteroids in 1 minute!", 100, 100)
    text("if you bump into 2 objects, you lose.", 100, 200) 
    text("if you get the green object, you get more time", 100, 300)
  }
  //power up 
  if(timer > 450 && healthVisible == true){
  fill('green');
    stroke('white');
  ellipse(healthX, healthY,40, 40)
 healthX = healthX + healthspeed
  healthY = healthY + healthspeedY}
  if(healthX > 390 || healthX < 10){
    healthspeed = -healthspeed
  }
    if(healthY > 390 || healthY < 10){
      healthspeedY= -healthspeedY
    }
  //the "asteroids"
  for (let i = 0; i < x.length; i++) {
    if (visible[i] && timer > 120){
      fill('red')
      ellipse(x[i], y[i], 40, 40);
      x[i] = x[i] + speedX[i];
      y[i] = y[i] + speedY[i];
      if (x[i] > 390 || x[i] < 10) {
        speedX[i] = -speedX[i];
      }
      if(y[i]>390 || y[i] < 10){
      speedY[i] = -speedY[i];
	}
    }
  }
  stroke('white')
  fill('purple')
  text("points: " + points,50,10)
  text("collided: " +collidedpoints, 100, 10)
timer = timer + 1 




  moveShip(); //<-- runs all code inside function moveShip() below
  drawShip(); //<-- runs all code inside function drawShip() below
  
  moveLaser(); //<--runs all code inside function moveLaser() below
  drawLaser(); //<-- runs all code inside function drawLaser() below
  
} //<--end draw() function 



function moveLaser(){
for(i = 0; i < laserX.length; i++){
  //actually move the laser
  laserX[i] = laserX[i] + laserSpeed*cos(laserAngle[i]); 
  laserY[i]= laserY[i] + laserSpeed*sin(laserAngle[i]); 

} //check for a new laser fire with the space bar

  if (keyIsDown(32)) {
    //laser starts at the location of the ship
    //and goes off in the direction ship is pointing
  laserAngle.push(shipAngle);
    laserX.push(shipX); 
    laserY.push(shipY);
    laserAngle[i] = shipAngle;  
  }
  

 //when the laser hits the object
  for (let i = 0; i < x.length; i++) {
    for(let j = 0; j < laserX.length; j++){
    if (visible[i] && dist(x[i], y[i], laserX[j], laserY[j]) < 40) {
      visible[i] = false;
      points = points + 1 
      
    }
   //obtaining the power up that gives you more time
  if(dist(healthX,healthY,laserX[j],laserY[j])< 20 && healthVisible == true){
     healthVisible = false 
    timer = timer - 300
     } 
    }
  }
  
text("timer: " +timer,  300, 10)
} //<-- end moveLaser() function



function drawLaser(){

  //draw the laser as a line 
for(i=0; i < laserX.length; i++){  
  stroke(255); 
  strokeWeight(3); 
   fill('white')
  line(laserX[i], laserY[i], laserX[i]+6*cos(laserAngle[i]), laserY[i]+6 *sin(laserAngle[i]));
}
  
  
} //<-- end moveLaser() function



function moveShip(){
  
  //actually move the space ship
  shipX = shipX + shipSpeed * cos(shipAngle);
  shipY = shipY + shipSpeed * sin(shipAngle);
  shipSpeed = shipSpeed * 0.96;
  //check for new movement from the keyboard
  if (keyIsDown(UP_ARROW)) {
    shipSpeed = 1.0;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    shipAngle += 0.05;
  }
  if (keyIsDown(LEFT_ARROW)) {
    shipAngle -= 0.05;
  }

} //<-- end moveShip() function 



function drawShip() {
  //draw the ship as a polygon that looks like an arrow/chevron
  noStroke(); 
  fill(255);
  translate(shipX, shipY);
  rotate(shipAngle);
  let frontX = 15;
  let sideY = 10;
  beginShape();
  vertex(frontX, 0);
  vertex(-frontX, sideY);
  vertex(-frontX / 2, 0);
  vertex(-frontX, -sideY);
  endShape(CLOSE);
  resetMatrix(); 
 //colliding into objects 
  for (let i = 0; i < x.length; i++) {
    if (dist(x[i], y[i], shipX, shipY) < 40 && collided[i]==false){
      collided[i] = true
      collidedpoints = collidedpoints + 1
    }
  }
//code that determines if the person won or not
    if(points == 5){
      text("you win", 200,10)
    noLoop();
    }
  if(collidedpoints == 2 || timer == 2000){
    text("game over", 200,10)
    noLoop();
  }

} //<-- end drawShip() function 
