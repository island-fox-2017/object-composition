"use strict"

let fs = require('fs')
// let option = 

// console.log(option);
class Ingredient{
  constructor(){
  }
  
convertIngredients(option, name){
      let arr = []
      for (let i=0; i<option.length-1; i++){
          let cookies = option[i].split(' = ');
          if(cookies[0] == name){
              let recipe = cookies[1].split(', '); // split untuk coma nya
              for (let j=0; j<recipe.length; j++){
                  let resep = new Ingredient(option);
                  resep.name=recipe[j].split(': ')[1];
                  resep.amount=recipe[j].split(': ')[0];
                  if(/sugar/.test(recipe[j].split(': ')[1])){
                      resep.has_sugar = true
                  } else {
                      resep.has_sugar = false
                  }
                  arr.push(resep);
              }
          }
      }
      // console.log(arr);
      return arr; 
}

class Cookie{
  constructor(name){
    this.name = name;
    this.status = "mentah"    
    this.ingredients = new Ingredient;
  }
  
  // makeIng(){
  //   this.ingredients.push(new Ingredient(this.name))
  //   return this.ingredients
  // }
  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie{
  constructor(status, ingredients, name){
    super(status, ingredients, name)
    this.peanut_count = 100;
    // this.ingredients = super.makeIng()
  }
}

class ChocolateChip extends Cookie{
  constructor(status, ingredients, name){
    super(status, ingredients, name)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie{
  constructor(status, ingredients, name){
    super(status, ingredients, name)
    this.other_cookie_count = 150
  }
}


class CookieFactory{
  constructor(){
    
  }
  
  static create(options){
    let arr = []    
    let cookiesName = "";
    for (let i = 0 ; i < options.length-1; i++){
      cookiesName = options[i].split(' = ')
      // console.log(cookiesName[0]);
      if(cookiesName[0] == 'peanut butter'){
        let peanutButter = new PeanutButter(cookiesName[0])
        arr.push(peanutButter)
        // console.log(arr);
      }else if (cookiesName[0] === 'chocolate chip'){
        let chocolateChip = new ChocolateChip(cookiesName[0])
        arr.push(chocolateChip)
      }else {
        let otherCookie = new OtherCookie(cookiesName[0]) 
        arr.push(otherCookie)
       }
    }
    return arr
    }
  
}


let options = fs.readFileSync('cookies.txt', 'utf8').split('\n') 
// console.log(options);

let batch_of_cookies = CookieFactory.create(options)

console.log(batch_of_cookies);
