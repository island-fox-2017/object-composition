"use strict"
let fs = require('fs')
let option = fs.readFileSync('cookies2.txt', 'utf8').trim().split('\n') 
class Ingredients {
  constructor(name,amount) {
    this.name = name
    this.amount = amount
  }
}
//Parent
class Cookie {
  constructor(name) {
    this.name = name
    this.ingredients = "";
    this.status = "mentah"
  }

  memisahkanIngredients(bahan){
    let ingredient1 = bahan.split(",")
    let ingredient2 = []
    let ingredient3 = {}
    let ingredient4 = []
    for(let i=0; i<ingredient1.length; i++){
      ingredient2.push(ingredient1[i].split(":"))
      ingredient3 = new Ingredients(ingredient2[i][1],ingredient2[i][0])
      ingredient4.push(ingredient3)
    }
    return JSON.stringify(ingredient4,null);
  }
  bake() {
    this.status = "selesai dimasak"
  }
}
//Child
class PeanutButter extends Cookie {
  constructor(name, bahan) {
    super(name)
    this.ingredients = this.memisahkanIngredients(bahan)
    this.peanut_count = 100
  }
}
class ChocolateCheese extends Cookie {
  constructor(name, bahan) {
    super(name)
    this.ingredients = this.memisahkanIngredients(bahan)
    this.choc_cheese_count = 200
  }
}
class ChocolateButter extends Cookie {
  constructor(name, bahan) {
    super(name)
    this.ingredients = this.memisahkanIngredients(bahan)
    this.choc_butter_count = 150
  }
}
class ChocolateChip extends Cookie {
  constructor(name, bahan) {
    super(name)
    this.ingredients = this.memisahkanIngredients(bahan)
    this.choc_chip_count = 150
  }
}
//=================================Factory Method===============================//
class CookieFactory {
  static create(option) {
    let listCookie = [];
    let array = '';
    for (let i = 0; i < option.length; i++) {
      array = option[i].split(" = ")
      if (array[0] === "peanut butter") {
        listCookie.push(new PeanutButter(array[0], array[1]))
      } else if (array[0] === "chocolate chip") {
        listCookie.push(new ChocolateChip(array[0], array[1]))
      } else if (array[0] === "chocolate cheese") {
        listCookie.push(new ChocolateCheese(array[0], array[1]))
      } else if (array[0] === "chocolate butter") {
        listCookie.push(new ChocolateButter(array[0], array[1]))
      }
    }
    return listCookie;
  }
}
let batch_of_cookies = CookieFactory.create(option);
console.log(batch_of_cookies);
// let test = new Cookie()
// console.log(test.pisah(bahanPisah));
