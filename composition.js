"use strict"
const fs = require('fs')
let option = fs.readFileSync('cookies.txt', 'utf8').split('\n')

class Ingredient {
  
}
class Cookie {
  constructor(name){
    this.status = 'mentah'
  }
  
  bake(){
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(){
    super()
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(){
    super()
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(){
    super()
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
