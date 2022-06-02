const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var imagemDeFundo;
var tower;
var towerImagem;
var cannon;
var angle;

function preload() {
 imagemDeFundo = loadImage("./assets/background.gif");
 towerImagem = loadImage("/assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
 options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);

 tower = Bodies.rectangle(160,350,160,310,options);
 World.add(world,tower);

 angle = 20;
 cannon = new Cannon(180, 110, 130, 100, angle);
 
}

function draw() {
  background(189);
  image(imagemDeFundo,0,0,1200,600);
  Engine.update(engine);
 
 rect(ground.position.x, ground.position.y,width*2,1);
  
 push();
 imageMode(CENTER);
 image(towerImagem, tower.position.x, tower.position.y, 160, 310);
 pop();

 cannon.display();
}
