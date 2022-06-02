class Cannon {
   constructor(x, y, width, height, angle){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.cannon_image = loadImage("./assets/canon.png");
    this.cannon_base = loadImage("./assets/cannonBase.png");
   } 

   display(){
       push();
        imageMode(CENTER);
        image(this.cannon_image,this.x, this.y, this.width, this.height);
       pop();

       image(this.cannon_base, 70, 20, 200, 200);
       noFill();
   }
}