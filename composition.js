"use strict"
var fs = require('fs');
var options = fs.readFileSync('cookies.txt', 'utf8').toString().trim().split('\n');
let optSplit = []
for (var i = 0; i<options.length; i++) {
   optSplit.push(options[i].split(' = '))
}

class Cookie {
  constructor(name, ingredients) {
    this.name = name
    this.status = "mentah"
    this.ingredients = this.splitIngredient(ingredients)
    this.has_sugar = this.hasSugar(ingredients)
  }
  bake() {
    this.status = "selesai dimasak"
  }
  splitIngredient(komposisi) {
    let bahan = []
    let splitKomposisi = komposisi.split(', ')
    for (var i = 0; i < splitKomposisi.length; i++) {
      let objKomposisi = new Ingredient (splitKomposisi[i].split(' : '))
      bahan.push(objKomposisi)
    }
    return bahan
  }
  hasSugar(sweet) {
    for (let i = 0; i<sweet.length; i++) {
      let cekSugar = /sugar/.test(sweet)
      if (cekSugar == sweet[i])  {return true}
      else {return false}
    }
  }
}

class Ingredient {
  constructor (item) {
    this.amount = item[0]
    this.name = item[1]
    // this.has_sugar=options['has_sugar']
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.other_cookie_count = 300
  }
}


class CookieFactory {
  constructor() {}

  static create(options) {
    let objCookie = []
    for (var i = 0; i<options.length; i++) {
         if (optSplit[i][0] === 'peanut butter') {
           let eachCookie = new PeanutButter (optSplit[i][0], optSplit[i][1])
           objCookie.push(eachCookie)
         }
         else if (optSplit[i][0] === 'chocolate chip') {
           let eachCookie = new ChocolateChip (optSplit[i][0], optSplit[i][1])
           objCookie.push(eachCookie)
         }
         else {
           let eachCookie = new OtherCookie (optSplit[i][0], optSplit[i][1])
           objCookie.push(eachCookie)
         }
    }
    return objCookie;
  }
  static cookieRecomendation(day, cookie_name) {
    let rekomen = []
    if (day == 'tuesday') {
      for (var i = 0; i < cookie_name.length; i++) {
        if(cookie_name[i].has_sugar == false) {
          rekomen.push(cookie_name[i].name)
        }
      }
    }
    return rekomen.join('');
  }
}

let batch_of_cookies = CookieFactory.create(options);
let sugarFree = CookieFactory.cookieRecomendation("tuesday", batch_of_cookies)

// console.log(JSON.stringify(batch_of_cookies,null,2))
console.log(batch_of_cookies);
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.log(`Kue yang tidak mengandung gula : ${JSON.stringify(sugarFree)}`);

// console.log(optSplit[0][1])
// let  a = new Cookie()
// console.log(ingredientSplit)
