//Cria a classe para o navio
class Boat{
    //Configurações de tamanho, imagem e corpo
    constructor(x, y,width, height, boatPos, boatAnimation){
        //Cria o corpo do navio
        this.body = Bodies.rectangle(x,y,width,height);
        //Define a largura do navio
        this.width = width;
        //Define a altura do navio
        this.height = height;
        //Define a posição y do navio
        this.boatPosition = boatPos;
        //Carrega a imagem do navio
        this.image = loadImage("./assets/boat.png");
        //Adicionar uma velocidade para o navio
        this.speed = 0.05;
        //Adicionar uma animação para o navio
        this.animation = boatAnimation;
        //Navio está quebrado?
        this.isBroken = false;
        //Adiciona o corpo do navio ao nosso jogo (mundo)
        World.add(world, this.body);
    }

    //Configurações para fazer a animação do navio
    animate(){
        this.speed += 0.05;
    }

    //Configurações para poder mostrar o navio
    display(){
        //Cria a posição, ângulo e índice do navio para facilitar
        var pos = this.body.position;
        var angle = this.body.angle;
        var index = floor(this.speed % this.animation.length);

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        //Centraliza a imagem
        imageMode(CENTER);
        //Mostra a animação do navio
        image(this.animation[index], 0, this.boatPosition, this.width, this.height);
        pop();
    }

    //Configurações para apagar o navio
    remove(index){
        this.animation = brokenboatAnimation;
        this.speed = 0.05;
        this.width = 300;
        this.height = 300;
        this.isBroken = true;
        //Coloca um atraso de 2 segundos
        setTimeout(()=>{
            //Apaga o navio e a informação dele
            Matter.World.remove(world, boats[index].body);
            delete boats[index];
        }, 2000);        
    }
}