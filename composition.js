"use strict"

const fs = require('fs');
let option = fs.readFileSync("cookies.txt", 'utf-8').split("\n");

class Cookie {
  constructor(name) {
    this.name = name;
    this.status = "mentah";
    this.ingredients = [];
    this.ingredientCookie();
  }

  bake(){
    this.status = "selesai dimasak";
  }

  ingredientCookie(){
    let ingr = fs.readFileSync('ingredients.txt', 'utf8').split('\n');
    for(let i=0; i<ingr.length-1; i++){
      // console.log('test',ingredients.length-1);
      ingr[i] = ingr[i].split(' = ');
      // console.log('test',ingredients[i] );
      ingr[i][1] = ingr[i][1].split(',');
      // console.log('test', ingr[i][1]);
      let temp = [];

      for(let j=0; j<ingr[i][1].length; j++){
        ingr[i][1][j] = ingr[i][1][j].split(" : ");
        temp.push(new Ingredient(ingr[i][1][j][1].trim(), ingr[i][1][j][0].trim()));
      }
      if(this.name === ingr[i][0]){
        this.ingredients = temp;
      }
    }
  }

}

class Ingredient {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}

class PeanutButter extends Cookie{
  constructor(name) {
    super(name);
    this.peanut_count = 100;
  }
}

class ChocholateChip extends Cookie {
  constructor(name) {
    super(name);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name);
    this.choc_chip_count = 150;
  }
}


class CookieFactory {

  static create(option){
    let objCake = [];
    for (var i = 0; i < option.length-1; i++) {
      if(option[i] === 'peanut butter'){
        objCake.push(new PeanutButter(option[i]))
      }else if( option[i] ===  'chocolate chip'){
        objCake.push(new ChocholateChip(option[i]));
      }else {
        objCake.push(new OtherCookie(option[i]));
      }
    } return objCake;
  }

 static cookieRecommendation(day, req){
    let noSugar = req;
    if(day === 'tuesday'){

      for(let i=noSugar.length-1; i>= 0; i--){
        for(let j = 0; j<noSugar[i].ingredients.length; j++){
          if(noSugar[i].ingredients[j].name === 'sugar'){
            noSugar.splice(i,1);
            break;
          }
        }
      }
    }
    return noSugar
  }

}

let batch_of_cookies = CookieFactory.create(option);
console.log(JSON.stringify(batch_of_cookies,null,2));


let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);

console.log("-------------------------------------");
console.log("sugar free cakes are :");

  for(let i = 0; i < sugarFreeFoods.length; i++){
    console.log(sugarFreeFoods[i].name)
  }
