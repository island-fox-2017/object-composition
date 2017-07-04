"use strict"

const fs = require('fs')
var source = fs.readFileSync('cookies.txt', 'utf8')
  .trim()
  .split('\n');

class Cookie {
  constructor(nama, ingredients) {
    this.name = nama;
    this.status = 'mentah'
    this.ingredients = this.ingredientz(ingredients);
    this.has_sugar = /gula/.test(ingredients);
    //this.ingredients = this.Ingredients(); //manggil method;
  }

  //method yang dipanggil this.ingredients
  //misahin ingredients + bikin object class ingredients
  ingredientz(ingredients) {
    var ingre = [];
    var arrIngre = ingredients.split(',');
    // console.log(arrIngre);
    for (var i = 0; i < arrIngre.length; i++) {
      var arrSplitDalem = arrIngre[i].split(' : ')
      let objIng = new Ingredients(arrSplitDalem[1], arrSplitDalem[0]);
      ingre.push(objIng);
    }
    return JSON.stringify(ingre)
  }

  bake() {
    this.status = 'selesai dimasak'
  }
}

class Ingredients {
  constructor(options, opt) {
    this.name = options
    this.amount = opt
    // this.has_sugar = options[]
  }
}


class PeanutButter extends Cookie {
  constructor(nama, ingredients, status) {
    super(nama, ingredients)
    this.peanut_count = 100;
  }
}

class Chocolatechip extends Cookie {
  constructor(nama, ingredients, status) {
    super(nama, ingredients)
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(nama, ingredients, status) {
    super(nama, ingredients)
    this.OtherCookieCount = 125;
  }
}

class CookieFactory {
  constructor() {

  }
  static create(options) {
    var toples = [];
    for (var i = 0; i < options.length; i++) {
      var arrayCookies = options[i].split(' = ');
      // console.log(arrayCookies);
      if (arrayCookies[0] === 'peanut butter') {
        var kuki = new PeanutButter(arrayCookies[0], arrayCookies[1]);
        toples.push(kuki)
      }
      else if (arrayCookies[0] === 'chocolate chip') {
        var kuki = new Chocolatechip(arrayCookies[0], arrayCookies[1])
        toples.push(kuki)
      }
      else {
        var kuki = new OtherCookie(arrayCookies[0], arrayCookies[1])
        toples.push(kuki)
      }
    };
    return toples
  }
}
let bikinKue = CookieFactory.create(source);
console.log(bikinKue);
