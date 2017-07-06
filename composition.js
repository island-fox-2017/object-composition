'use strict'
const fs = require('fs')
var options = fs.readFileSync('cookies.txt').toString().trim().split('\n')

class Cookie {
  constructor(name, ingred, sugar) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = ingred
    this.has_sugar = sugar
  }

  bake() {
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingred, sugar) {
    super(name, ingred, sugar)
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name,ingred,sugar) {
    super(name, ingred,sugar)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name,ingred,sugar) {
    super(name, ingred,sugar)
    this.other_cookie_count = 150
  }
}

class CookieFactory {
  constructor() {}

  static create(options) {
    let arr = []
    for (let i=0; i<options.length; i++) {

      if (options[i].split(' = ')[0] == 'peanut butter') {
        arr.push(new PeanutButter(options[i].split(' = ')[0], this.olahIngredients(i), this.cekGula(i)))
      }
      else if (options[i].split(' = ')[0] == 'chocolate chip') {
        arr.push(new ChocholateChip(options[i].split(' = ')[0], this.olahIngredients(i), this.cekGula(i)))
      }
      else {
        arr.push(new OtherCookie('other cookie', this.olahIngredients(i), this.cekGula(i)))
      }
    }
    return arr
  }

  static olahIngredients(cookieKe) { //olah ingredients jadi array of object
    let listObjIngredients = []
    let listIngredients = options[cookieKe].split(' = ')[1].split(', ')
    for (let i=0; i<listIngredients.length; i++) {
      let arrAmountBahan = listIngredients[i].split(': ')
      listObjIngredients.push(JSON.stringify(new Ingredient(arrAmountBahan)))
    }
    return listObjIngredients
  }

  static cekGula(bahanCookieKe) {
    if (/sugar/g.test(options[bahanCookieKe])) {
      return true
    }
    else {
      return false
    }
  }

  static cookieRecomendation(day,listCookie) {
    let noSugarCookie = []
    if (day == 'tuesday') {
      for (let i=0; i<listCookie.length; i++) {
        if (listCookie[i].has_sugar == false) {
          noSugarCookie.push(listCookie[i])
        }
      }
    }
    return noSugarCookie
  }
}

class Ingredient {
  constructor(arrBahan) {
    this.name = arrBahan[1]
    this.amount = arrBahan[0]
  }
}

let batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies);
let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday',batch_of_cookies)
console.log('sugar free cakes are: ');
for (let i=0; i<sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i]);
}
