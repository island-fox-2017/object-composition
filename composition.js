'use strict'

let fs = require('fs');

class Ingredient {
  constructor(options) {
    this.name = options.name;
    this.amount = options.amount;
    this.sugar = options.sugar;
  }
}

class Cookie {
  constructor(name, options) {
    this.name = name;
    this.status = 'mentah';
    this.ingredients = this.bahanKue(name, options);
    this.has_sugar = this.hasSugar();
  }

  bake() {
    this.status = 'selesai dimasak';
  }

  bahanKue(name, options) {
    let list = [];

    for (var i = 0; i <= options.length - 1; i++) {
      let kue = options[i].match(/^\w+\s\w+/)[0];
      let bahan = options[i].match(/\d+[\s\w\(\)]*:[\s\w]+/g);
      if (kue == name) {
        for (var j = 0; j <= bahan.length - 1; j++) {
          let bahan2 = new Ingredient(options);
          bahan2.name = bahan[j].split(' : ')[1];
          bahan2.amount = bahan[j].split(' : ')[0];
          if (/sugar/.test(bahan[j])) bahan2.sugar = true;
          else bahan2.sugar = false;
          list.push(bahan2);
        }
      }
    }
    return list;
  } // --- bahanKue

  hasSugar() {
    for (var i = 0; i <= this.ingredients.length - 1; i++) {
      if(this.ingredients[i].sugar) return true;
    }
    return false;
  }  // --- hasSugar
}  // ---------- class Cookie ----------


class PeanutButter extends Cookie {
  constructor(name, options) {
    super(name, options)
    this.peanut_count = 100;
  }
}  // ---------- class PeanutButter ----------


class ChocolateChip extends Cookie {
  constructor(name, options) {
    super(name, options)
    this.choc_chip_count = 200;
  }
}  // ---------- class ChocolateChip ----------


class OtherCookie extends Cookie {
  constructor(name, options) {
    super(name, options)
    this.other_count = 150;
  }
}  // ---------- class OtherCookie ----------


class CookieFactory {
  constructor() {}

  static create(options) {
    let batch = [];

    for (var i = 0; i <= options.length - 1; i++) {
      let namaKue = options[i].match(/^\w+\s\w+/)[0];
      if (namaKue == 'peanut butter') batch.push(new PeanutButter(namaKue, options));
      else if (namaKue == 'chocolate chip') batch.push(new ChocolateChip(namaKue, options));
      else batch.push(new OtherCookie(namaKue, options));
    }

    return batch;
  }  // --- static create

  static recommendation(day, cookiesList) {
    let recommended = [];

    for (var i = 0; i <= cookiesList.length - 1; i++) {
      if (day == 'tuesday'){
        if (!cookiesList[i].has_sugar) recommended.push(cookiesList[i].name);
      } else recommended.push(cookiesList[i].name);
    }

    return recommended;
  } // --- recommendation
}  // ---------- class CookieFactory ----------


let options = fs.readFileSync('cookies.txt', 'utf8').trim().split('\n');

let batch_of_cookies = CookieFactory.create(options);
// console.log(batch_of_cookies);

let kacang = new PeanutButter('peanut butter', options);
let coklat = new ChocolateChip('chocolate chip', options);
let coklat_butter = new OtherCookie('chocolate butter', options);
// console.log(kacang);
// console.log(coklat);
// console.log(coklat_butter.ingredients);

console.log(batch_of_cookies[0]);

let sugarFree = CookieFactory.recommendation('tuesday', batch_of_cookies)
console.log(`Today is tuesday. It\'s sugar-free day. Our recommendation(s) are: ${sugarFree}`) ;