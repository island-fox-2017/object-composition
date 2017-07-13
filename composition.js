"use strict"
var fs = require('fs');

class Cookie {
  constructor(nama ,ingridients) {
    this.name = nama
    this.status = "mentah"
    this.ingridient = this.toArrayOfObject(ingridients)
    this.hasGula = this.hasGula(ingridients)

  }
  bake(){
    this.status = "selesai dimasak"
  }
  //method ini akan dipanggil oleh this.ingridient
  toArrayOfObject(ingridients) {
        let arrayHasil = []

        let splitPerBahan = ingridients.split(",")

        for (let i = 0; i < splitPerBahan.length; i++) {
            arrayHasil.push(new Ingridients(splitPerBahan[i].split(":")))
        }
        return JSON.stringify(arrayHasil) ;
  }
  hasGula(ingridients){
    return /sugar/.test(ingridients)
  }

}


class PeanutButter extends Cookie {
  constructor(nama , status, ingridient) {
    super(nama,status,ingridient)
    this.peanut_count = 100
  }
}

class ChocoloateChip extends Cookie{
  constructor(nama , status, ingridient){
    super(nama,status,ingridient)
    this.choc_chip_count = 200
  }
}

class Others extends Cookie{
  constructor(nama , status, ingridient){
    super(nama,status,ingridient)
    this.choc_chip_count = 150
  }
}

class Ingridients {
  constructor(options) {
      this.name = options[1]
      this.amount = options[0]
  }
}
class CookieFactory {
  constructor() {

  }
  static create(options){
    let listOfCookies = []

    for (var i = 0; i < options.length; i++) {
      let arrCookies = options[i].split(' = ')
      if(arrCookies[0]=='peanut butter'){
        let addToObject = new PeanutButter(arrCookies[0],arrCookies[1])
        listOfCookies.push(addToObject)
      }
      else if (arrCookies[0]=='chocolate chip') {
        let addToObject = new ChocoloateChip(arrCookies[0],arrCookies[1])
        listOfCookies.push(addToObject)
      }else {
        let addToObject = new Others(arrCookies[0],arrCookies[1])
        listOfCookies.push(addToObject)
      }
    }

    return listOfCookies
  }
  static cookieRecomendation(hari, options){
    var noSugar = []
    for (var i = 0; i < options.length; i++) {
    if(hari == 'tuesday' && options[i].hasGula == false){
        noSugar.push(options[i].name)
      }
      else {
        noSugar.push(options[i].name)
      }
    }
    return noSugar
  }

}


let options = fs.readFileSync('cookies.txt', 'utf8').toString().trim().split('\n');

let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecomendation('wednesday',batch_of_cookies);
console.log("sugar free cakes are : ");
console.log(sugarFreeFoods);
