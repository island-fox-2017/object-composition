"use strict"

const fs = require('fs')
let option = fs.readFileSync('cookies.txt', 'utf8').trim().split('\n')

class Ingredient{
  constructor(name, amount){
    this.name = name
    this.amount = amount
  }
}

class Cookie {
  constructor(name){
    this.name = name
    this.status = 'mentah'
    this.ingredients = []
    this.ingredientCookie()  
  }
  
  bake(){
    this.status = 'selesai dimasak'
  }
  
  ingredientCookie(){
    let content = fs.readFileSync('ingredient.txt', 'utf8').trim().split('\n')
    for(let i = 0; i < content.length; i++){
      content[i] = content[i].split(' = ')
      content[i][1] = content[i][1].split(',')
      
      let saveContent = []
        for(let j = 0; j < content[i][1].length; j++){
          content[i][1][j] = content[i][1][j].split(' : ') 
          saveContent.push(new Ingredient(content[i][1][j][1].trim(), content[i][1][j][0].trim()))
        }
      
      if(this.name === content[i][0]){
        this.ingredients = saveContent
      }
    }
  }
  
}

class PeanutButter extends Cookie {
  constructor(name){
    super(name)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name){
    super(name)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name){
    super(name)
  }
}


class CookieFactory {
  constructor(){
  }
  
  static create(option){
    let arrCookies = []
    for(let i = 0; i < option.length; i++){
    if(option[i] === 'peanut butter'){
      arrCookies.push(new PeanutButter(option[i]))
    }else if(option[i] === 'chocolate chip'){
      arrCookies.push(new ChocolateChip(option[i]))
    }else {
      arrCookies.push(new OtherCookie(option[i]))
    }
  }
    return arrCookies
  }
  
  static cookieRecommendation(day, req){
    let noSugar = req
    if(day === 'tuesday'){
      for(let i = noSugar.length-1; i>=0; i--){
        for(let j = 0; j < noSugar[i].ingredients.length; j++ ){
          if(noSugar[i].ingredients[j].name === 'sugar'){
            noSugar.splice(i, 1)
            break;
          }
        }
      }
    }
    return noSugar
  } 
}

let batch_of_cookies = CookieFactory.create(option)
// console.log(JSON.stringify(batch_of_cookies, null, 2)); //result with JSON
console.log(batch_of_cookies); //result array of object

let sugarFreeCookie = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies)
console.log('\n');
console.log('========================================================================');
console.log('Cookie sugar free is');

for(let i = 0; i < sugarFreeCookie.length; i++){
  console.log(sugarFreeCookie[i].name);
}
