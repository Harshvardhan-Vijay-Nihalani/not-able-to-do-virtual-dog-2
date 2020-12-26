class Food{
    constructor(){
        this.image,
        this.foodStock,
        this.lastFed
    }
    preload(){
        this.image = loadImage("Milk.png");
    }
    getFoodStock(){

    }
    updateFoodStock(){

    }
    deductFood(){

    }
    display(){
        var x=80;
        var y=100;

        imageMode(CENTER);
        image(this.image, 720, 200, 70, 70)
        
        if(this.foodStock != 0){
            for(var i=0;i<this.foodStock; i++){
                image(this.image, x, y, 50, 50);
                x=x+30;
            }
        }
    }

}
