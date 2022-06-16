//Cria a classe (molde) da bala de canhão
class CannonBall {
    //Define os parâmetros usados na criação de
    //cada bala de canhão
    constructor(x,y){
        //Define o tamanho do raio da bala de canhão
        this.r = 30;
        //Configuração para a bala de canhão não cair
        var options = {
            isStatic: true
        }
        //Cria um corpo circular para a bala de canhão
        this.body = Bodies.circle(x, y, this.r, options);
        //Define a imagem
        this.image = loadImage("./assets/cannonball.png");
        //Cria a matriz da trajetória
        this.trajectory = [];
        //Adiciona o corpo da bala de canhão ao mundo
        World.add(world,this.body);
    }

    //Função para mostrar a bala de canhão
    display(){
        //Cria uma variável para a posição do corpo
        var pos = this.body.position;

        //Faz as configuraçöes da imagem da bala de canhão
        push();
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.r, this.r);
        pop();

        //Armazena as posicões da bala para a trajetória
        if(this.body.velocity.x > 0 && pos.x > 10){
            var position = [pos.x, pos.y];
            this.trajectory.push(position);
        }

        //Desenha a trajetória da bala (rastro)
        for(var i = 0; i < this.trajectory.length; i++){
            image(this.image, this.trajectory[i][0],
                  this.trajectory[i][1], 5, 5);
        }
    }

    //Função para atirar a bala de canhão
    shoot(){
        //configurações do ângulo
        var newAngle = cannon.angle - 28;
        newAngle = newAngle * (3.14/180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        //Faz a bola poder se mover
        Matter.Body.setStatic(this.body, false);
        //Adiciona velocidade à bola
        Matter.Body.setVelocity(this.body, {x: velocity.x * (180/3.14), y: velocity.y * (180/3.14)});
    }
}