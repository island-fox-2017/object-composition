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
}

let batch_of_cookies = CookieFactory.create(option)
console.log(batch_of_cookies);
