"use strict"

const fs = require('fs');

class Cookie {
  constructor() {
    this.name = "";
    this.status = "mentah";
    this.ingredients = [];
  }

  bake() {
    this.status = "selesai dimasak";
  }

  hasSugar() {
    for (let i = 0; i < Object.keys(this.ingredients).length; i++) {
      if (this.ingredients[i].name.match('sugar')) return true;
    }
    return false;
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super();
    this.name = name;
    this.ingredients = ingredients;
    this.sugarExistence = this.hasSugar();
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients) {
    super();
    this.name = name;
    this.ingredients = ingredients;
    this.sugarExistence = this.hasSugar();
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super();
    this.name = name;
    this.ingredients = ingredients;
    this.sugarExistence = this.hasSugar();
    this.other_cookie_count = 150;
  }
}

class Ingredient {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
}

class RicheeseFactory {
  constructor() {

  }

  static create(options) {
    let cookieArrOfObj = [];
    let cookie = "";
    let ingre = "";
    let ingreArr = [];
    for (let i = 0; i < Object.keys(options).length; i++) {

      for (let j = 0; j < options[i].ingredients.length; j++) {
        ingre = new Ingredient(options[i].ingredients[j].split(':')[1], options[i].ingredients[j].split(':')[0]);
        ingreArr.push(ingre);
      }

      if (options[i].cookie === 'peanut butter') {
        cookie = new PeanutButter(options[i].cookie, ingreArr);
      }
      else if (options[i].cookie === 'chocolate chip') {
        cookie = new ChocolateChip(options[i].cookie, ingreArr);
      }
      else if (options[i].cookie === 'chocolate cheese') {
        cookie = new OtherCookie(options[i].cookie, ingreArr);
      }
      else if (options[i].cookie === 'chocolate butter') {
        cookie = new OtherCookie(options[i].cookie, ingreArr);
      }

      cookieArrOfObj.push(cookie);
      ingre = ""; ingreArr = [];
    }
    return cookieArrOfObj;
  }

  static cookieRecommendation(day,cookiesBatch) {
    let sugarFreeFood = [];
    if (day === 'tuesday') {
      for (let i = 0; i < Object.keys(cookiesBatch).length; i++) {
        if (cookiesBatch[i].sugarExistence === true) sugarFreeFood.push(cookiesBatch[i]);
      }
      return sugarFreeFood;
    }
    else return cookiesBatch;
  }
}

let options = fs.readFileSync('cookies.txt', 'utf8').split('\n');
options.pop();
let cookie = [];
let ingredients = []
let cookieFull = {};
for (let i = 0; i < options.length; i++) {
  cookie.push(options[i].split(' = ')[0]);
  ingredients.push(options[i].split(' = ')[1].split(', '));
  cookieFull[i] = {
    cookie: cookie[i],
    ingredients: ingredients[i]
  }
}

let cookies_batch = RicheeseFactory.create(cookieFull);
console.log(JSON.stringify(cookies_batch,null,2));

let sugarFreeFoods = RicheeseFactory.cookieRecommendation('tuesday', cookies_batch);
console.log(JSON.stringify(sugarFreeFoods,null,2));
