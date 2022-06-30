//Cria a classe para o navio
class Boat{
    //Configurações de tamanho, imagem e corpo
    constructor(x, y,width, height, boatPos){
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
        //Adiciona o corpo do navio ao nosso jogo (mundo)
        World.add(world, this.body);
    }

    //Configurações para poder mostrar o navio
    display(){
        //Cria a posição e ângulo do navio para facilitar
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        //Centraliza a imagem
        imageMode(CENTER);
        //Mostra a imagem do navio
        image(this.image, 0, this.boatPosition, this.width, this.height);
        pop();
    }

    //Configurações para apagar o navio
    remove(index){
        //Coloca um atraso de 2 segundos
        setTimeout(()=>{
            //Apaga o navio e a informação dele
            Matter.World.remove(world, boats[index].body);
            delete boats[index];
        }, 2000);        
    }
}