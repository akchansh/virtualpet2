class Food {
    constructor(){

        // this.foodStock = 0;
        this.lastFed = 0;

        this.image = loadImage("images/Milk.png");

    }

    updateFoodStock(food){
        foodS = food;
    }

    display(){

        var x = 80;
        var y = 200;

        if(foodS!== 0){
            console.log(foodS)
            for(var i = 0; i<foodS;i++){
                if(i % 10===0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
           
            }
        }
    }
}
