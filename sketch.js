var foodStock,database,foodS,milk,food
var dog,happyDog,dogImg
var feedbutton,addbutton
var fedtime,lastFed,foodObj

function preload(){
dogImg = loadImage("images/dogImg.png")
happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(800,500);
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",function(data){
    foodS = data.val();
  })

  food = new Food()
  feedbutton = createButton("Feed the Dog")
  feedbutton.position(450,95)
  feedbutton.mousePressed(feedDog)

  addbutton = createButton("Add Food")
  addbutton.position(550,95)
  addbutton.mousePressed(addfood)

  dog = createSprite(650,225,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.5;
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  food.display()
  database.ref('FedTime').on('value', function (data){
    lastFed = data.val()
  })
  fill(255,255,255)
  textSize(25)
  if(lastFed>=12){
    text("Last Fed: "+lastFed%12 + " PM",100,70);
    }else if(lastFed===0){
      text("Last Fed: 12AM",100,70);
    }else{
      text("Last Fed: "+lastFed + " AM",100,70);
    }
  // text("Press UP ARROW to feed your pet", 210,50)
   text("Food left : "+ foodS,120,150)
}

function keyPressed(){
  if(keyCode === UP_ARROW){
    writeStock(foodS);
    if(foodS > 0){
    dog.addImage(happyDogImg);
    }
    else{
      dog.addImage(dogImg);
    }

  }
} 
function writeStock(x){
  if(x<0){
    x = 0;
  }
  else if(x>0){
    x = x-1 ;
  }
  database.ref('/').update({
    food:x
  })
}

function feedDog(){
  dog.addImage(happyDogImg)
  if(foodS<=0){
    foodS=0;
  }else{
    foodS = foodS-1;

  }  
    database.ref('/').update({
      FedTime:hour(),
      food : foodS
    }
    )
}

function addfood(){
  foodS = foodS+1
  database.ref('/').update({
    food : foodS
  })
}
