//Cria a classe para o navio
class Boat{
    //Configurações de tamanho, imagem e corpo
    constructor(x, y,width, height, boatPos){
        this.body = Bodies.rectangle(x,y,width,height);
        this.width = width;
        this.height = height;
        this.boatPosition = boatPos;
        this.image = loadImage("./assets/boat.png");
        World.add(world, this.body);
    }

    //Configurações para poder mostrar o navio
    display(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, this.boatPosition, this.width, this.height);
        pop();
    }
}