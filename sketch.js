//Configurações da biblioteca Matter
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
//Variáveis do nosso jogo
var imagemDeFundo;
var tower;
var towerImagem;
var cannon;
var angle;
var cannonBall;
var balls = [];
var boat;
var boats = [];
var boatAnimation = [];
var boatSpritesheet, boatSpritedata;
var brokenboatAnimation = [];
var brokenboatSpritesheet, brokenboatSpritedata;
var waterAnimation = [];
var waterSpritesheet, waterSpritedata;

//Função que usamos para carregar os arquivos
function preload() {
 imagemDeFundo = loadImage("./assets/background.gif");
 towerImagem = loadImage("./assets/tower.png");
 boatSpritesheet = loadImage("./assets/boat/boat.png");
 boatSpritedata = loadJSON("./assets/boat/boat.json");
 brokenboatSpritesheet = loadImage("./assets/boat/broken_Boat.png");
 brokenboatSpritedata = loadJSON("./assets/boat/broken_Boat.json");
 waterSpritesheet = loadImage("./assets/water_splash/water_splash.png");
 waterSpritedata = loadJSON("./assets/water_splash/water_splash.json");
}

//Função de configuração
function setup() {
  //Cria a tela
  canvas = createCanvas(1200, 600);
  //Inicia o mundo com a biblioteca Matter
  engine = Engine.create();
  world = engine.world;
  //Configuração para a torre e o chão não caírem
  options={
    isStatic:true
  }

  //Crie o corpo para o chão
  ground= Bodies.rectangle(0,height-1, width*2,1,options);
  //Adiciona o corpo do chão ao mundo
  World.add(world,ground);

  //Cria o corpo para a torre
  tower = Bodies.rectangle(160,350,160,310,options);
  //Adiciona o corpo da torre ao mundo
  World.add(world,tower);

  //Define o modo do ângulo em graus
  angleMode(DEGREES);
  //Define o valor do ângulo
  angle = 20;
  //Cria o objeto de canhão com base na classe de Canhão
  cannon = new Cannon(180, 110, 130, 100, angle);
  
  //Configurações para as animações do navio navegando
  var boatFrames = boatSpritedata.frames;
  for(var i = 0; i < boatFrames.length; i++){
    var pos = boatFrames[i].position;
    var img = boatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }
  
  //Configurações para as animações do navio afundando
  var brokenboatFrames = brokenboatSpritedata.frames;
  for(var i = 0; i < brokenboatFrames.length; i++){
    var pos = brokenboatFrames[i].position;
    var img = brokenboatSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    brokenboatAnimation.push(img);
  }

  //Configurações para as animações da bala de canhão afundando\
  var waterFrames = waterSpritedata.frames;
  for(var i = 0; i < waterFrames.length; i++){
    var pos = waterFrames[i].position;
    var img = waterSpritesheet.get(pos.x, pos.y, pos.w, pos.h);
    waterAnimation.push(img);
  }
}

//Função de desenho
function draw() {
  //Define a cor de fundo como cinza
  background(189);
  //Coloca a imagem de fundo do jogo
  image(imagemDeFundo,0,0,1200,600);

  //Faz a física do jogo ser atualizada
  Engine.update(engine);
 
  //Desenha o chão do jogo
  rect(ground.position.x, ground.position.y,width*2,1);
  
  //Faz a configuração desejada ser apenas para a torre
  push();
  //Define o modo da imagem como centralizada
  imageMode(CENTER);
  //Desenha a imagem da torre
  image(towerImagem, tower.position.x, tower.position.y, 160, 310);
  //Termina a configuração da torre
  pop();
  
  //Mostra o canhão
  cannon.display();

  //Chama a função para criar e mostrar os navios
  showBoats();

  //Mostra cada bala do canhão
  for(var i = 0; i < balls.length; i++){
    showCannonBalls(balls[i],i);
    collisionWithBoat(i);
  }

}

//Função que atira cada bala de canhão
function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}

//Função que cria cada bala de canhão
function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

//Função que é chamada para mostrar cada bala de canhão
function showCannonBalls(ball, i){
  if(ball){
    ball.display();
    ball.animate();
    if(ball.body.position.x >= width ||
       ball.body.position.y >= height-50){
        ball.remove(i);
       }
  }
}

//Função que é chamada para criar todos os navios
function showBoats(){
  //Se não tem navio, cria o primeiro
  //Se tem navio, cria os outros navios
  if(boats.length > 0){
    if(boats[boats.length-1] === undefined ||
      boats[boats.length-1].body.position.x < width-300){
      var positions = [-40,-60,-70,-20];
      var position = random(positions);
      //Cria os outros navio
      var boat = new Boat(width, height-100, 170, 170, position, boatAnimation);
      boats.push(boat);
    }
    for(var i = 0; i < boats.length; i++){
      if(boats[i]){
        //Dar velocidade aos navios
        Matter.Body.setVelocity(boats[i].body,{x:-0.9, y:0});
        //mostrar e animar os navios
        boats[i].display();
        boats[i].animate();
      }
    }

  } else {
  //Cria o navio
  var boat = new Boat(width,height-60,170,170,-80, boatAnimation);
  boats.push(boat);
  }
}

//Função para detectar a colisão entre o navio e a bala de canhão
function collisionWithBoat(index){
  //Repetição para todos os navios
  for(var i = 0; i < boats.length; i ++){
    //Verifica se existe bala de canhão e navio
    if(balls[index] !== undefined &&
      boats[i] !== undefined){
        //Verifica a colisão entre a bala de canhão e navio
        var collision = Matter.SAT.collides(balls[index].body,boats[i].body);
        //Confere se aconteceu a colisão
        if(collision.collided){
          //Remove o navio
          boats[i].remove(i);

          //Apaga a bala de canhão
          Matter.World.remove(world, balls[index].body);
          delete balls[index];
        }
      }
  }
}