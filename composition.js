"use strict"
var fs = require('fs');
var options = fs.readFileSync('cookies.txt', 'utf8').toString().trim().split('\n');

let pecahIngre = [];
for (var i = 0; i < options.length; i++) {
  pecahIngre.push(options[i].split('='))
}
console.log(pecahIngre);
// console.log(pecahIngre[0][0]);

class Ingredient {
  constructor(bumbu) {
    this.amount = bumbu[0];
    this.name = bumbu[1];
  }
}

class Cookie {
  constructor(name,ingredient) {
    // this.name = name;
    this.status = 'mentah';
    this.ingredient = this.bahanIngre(ingredient);
    console.log(this.ingredient);
    this.other_count = 150;
    this.mengandungGula = this.gula(ingredient);
    // console.log(this.mengandungGula);
  }
  bake() {
    this.status = 'selesai dimasak';
  }
  bahanIngre(composition) {
    console.log(composition);
    let toArrObj = [];
    // console.log(composition.length);
    for (let i = 0; i < composition.length; i++) {
      toArrObj.push(new Ingredient(composition[i].split(':')));
    }
    return toArrObj;
    // console.log(toArr);
  }
  gula(option) {
    // console.log(option[1].trim().split(':')[1]);
    for(let i = 0; i < pecahIngre.length; i++) {
      if(/sugar/g.test(option[1].trim().split(':')[1])) {
        return true
      } else {
          return false;
      }
    }
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient);
    this.name = name;
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient);
    this.name = name;
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie{
  constructor(name, ingredient) {
    super(name, ingredient);
    this.name = name;
  }
}

class CookieFactory {
  constructor() {
  }
  static create(pecahIngre) {
    let listKue = []
    for (let i = 0 ; i < options.length; i++) {
      if (pecahIngre[i][0].trim() == 'peanut butter') {
        let peanutButter = new PeanutButter(pecahIngre[i][0].trim(), pecahIngre[i][1].split(','));
        listKue.push(peanutButter)
      } else if (pecahIngre[i][0].trim() == 'chocolate chip') {
        let chocolateChip = new ChocolateChip(pecahIngre[i][0].trim(), pecahIngre[i][1].split(','));
        listKue.push(chocolateChip)
      } else {
        let otherCookie = new OtherCookie(pecahIngre[i][0].trim(), pecahIngre[i][1].split(','));
        listKue.push(otherCookie);
      }
    }
    return listKue;
  }
  static cookieRecommendation(hari, kue){
    let tanpaGula = [];
    // console.log(kue.length);
    for (let i = 0; i < kue.length; i++) {
      if (kue[i].mengandungGula == false) {
        tanpaGula.push(kue[i])
      }
    }
    return tanpaGula;
    console.log(tanpaGula);
   }
}

let batch_of_cookies = CookieFactory.create(pecahIngre);
// console.log(JSON.stringify(batch_of_cookies));
console.log(batch_of_cookies);
console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=');
let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
// console.log(sugarFreeFoods);
console.log('Sugar free cakes are: ');
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
// console.log(batch_of_cookies[3].ingredient[1]);
