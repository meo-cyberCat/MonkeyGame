
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score=0; 
var survivalTime= 0;
var gameState= "play"

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 
  monkey= createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running)
  monkey.scale= 0.1
  
  
  ground = createSprite(400,350,900,10);
  ground.velocityX= -4 
  ground.x= ground.width/2 
  console.log(ground.x);
  
  bananaGroup= new Group();
 obstacleGroup= new Group();
}


function draw() {
  background("blue");
  
  if(gameState==="play"){
    
if(ground.x<0){
  ground.x= ground.width/2}
  
  if(keyDown("space")){
    monkey.velocityY= -12
    
  }
  
  monkey.velocityY = monkey.velocityY+0.8 
  
  monkey.collide(ground);
  
  spawnBanana();
  spawnObstacles();
  
    survivalTime= Math.round(frameCount/60);
    
  if(monkey.isTouching(bananaGroup)){score= score+1
  bananaGroup.destroyEach();}
  
  if(monkey.isTouching(obstacleGroup)){
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    ground.velocityX= 0; 
    monkey.velocityY= 0;
    
    monkey.destroy();
    text("The End", 150,200)
    gameState= "end";
    
  }
  }
  
  drawSprites();
  
  textSize(20);
  text("Score"+ score,0,50)
  text("survivalTime: "+ survivalTime,0,70);
}

function spawnBanana(){
  if(frameCount% 80=== 0){
    banana = createSprite(600,random(120,200));
    banana.addImage(bananaImage)
    banana.scale= 0.05
    banana.velocityX = -5
    banana.lifetime= 300; 
    bananaGroup.add(banana);
    monkey.depth= banana.depth 
    monkey.depth= monkey.depth+1 
  }
}
function spawnObstacles(){
  if(frameCount% 300=== 0){
    obstacle = createSprite(600,320);
    obstacle.addImage(obstacleImage)
    obstacle.scale= 0.15
    obstacle.velocityX = -5
    obstacle.lifetime= 300; 
   obstacleGroup.add(obstacle);
    monkey.depth= obstacle.depth 
    monkey.depth= monkey.depth+1 
  }
}



