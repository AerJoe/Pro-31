const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var leftwall, rightwall
var ground
var link
var bridge
var bridge_con
var bridge_con1
var bg_img
var axe_img
var food
var zombie
var zombie1, zombie2, zombie3, zombie4, sadzombie
var breakButton
var backgroundimg

var stones=[]
var collided = false



function preload() {
zombie1 = loadImage("./assets/zombie1.png")
zombie2 = loadImage("./assets/zombie2.png")

zombie3 = loadImage("./assets/zombie3.png")
zombie4 = loadImage("./assets/zombie4.png");
sadzombie = loadImage("./assets/sad_zombie.png")
//breakButton = loadImage("./assets/axe.png")
backgroundimg = loadImage("./assets/background.png")
}

function setup() {
  createCanvas(1133, 918);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  rightwall = new Base(width-100,height - 300, 200, height/2 + 100, "#8d6e63", true)
  leftwall = new Base(100, 100 + 50, 100, 100, "#8d6e63", true)
  ground = new Base(0, height-10, width * 2, 20, "#795548", true)
  bridge = new Bridge(20, {x: width/2 - 350, y: height/2})
  bridge_con1 = new Link(bridge, leftwall)
  bridge_con = new Link(bridge, rightwall)
    
  for(i=0; i<=8;i++) {
  var x = random (width/2-200,width/2+300)
  var y = random (-10, 140)
  var stone = new Stone(x, y, 80, 80)
  stones.push(stone)
}

zombie = createSprite(width/2, height - 110)
zombie.addAnimation("left_to_right", zombie1, zombie2, zombie1)
zombie.addAnimation("right_to_left",zombie3, zombie4, zombie3)
zombie.addImage("sad zombie", sadzombie)
zombie.scale = 0.08
zombie.velocityX = 8

breakButton = createImg("./assets/axe.png")
breakButton.position(width - 200, height/2 - 50)
breakButton.size(70,70)
breakButton.mouseClicked(handleButtonPress)
}

function draw() {
  background(backgroundimg)
  Engine.update(engine);

  bridge.show()
  
  for(var stone of stones ){
    stone.display()
    var pos = stone.body.position
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y)
    if(distance <=50) {
      zombie.velocityX = 0
      Matter.Body.setVelocity(stone.body, {x: 10, y: -10 })
      zombie.changeImage("sad zombie")
      collided = true
    }
  }
  
  if (zombie.position.x >= width - 300 && !collided) {
    zombie.velocityX = -10;
    zombie.changeAnimation("right_to_left");
  }

  if (zombie.position.x <= 300 && !collided) {
    zombie.velocityX = 10;
    zombie.changeAnimation("left_to_right");
  }
  drawSprites()
}

function handleButtonPress() {
bridge_con.detach();
setTimeout(() => {
  bridge.break();
  }, 1500)
}