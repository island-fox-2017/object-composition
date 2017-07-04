const fs = require("fs");
let options = fs.readFileSync("./ingredients.txt", 'utf-8').split(/\r?\n/);
let snack = [];
for (var i = 0; i < options.length; i++) {
  snack.push(options[i].split('='))
}

class Ingredient {
  constructor(param) {
    this.amountIngredient = param[0]
    this.nameIngredient = param[1]
  }
}

class Cookie {
  constructor(name,ingredients) {
    this.ingredients = this.ingredientParts(ingredients)
    this.status = 'belum masak'
    this.other_count = 150
    this.containSugar = this.getSugar(ingredients)
  }

  ingredientParts(composition) {
    let arrayObject = []
    for(let i = 0; i<composition.length; i++) {
      arrayObject.push(new Ingredient(composition[i].split(':')));
    }
    return arrayObject
  }

  bake() {
    this.status = 'masak'
  }

  getSugar(option) {
    for(let i = 0; i<option.length; i++) {
      if(option[i].split(':')[1].trim() == 'sugar')
      return true
    }
    return false
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name,ingredients);
    this.name = name;
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients) {
    super(name,ingredients);
    this.name = name;
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name,ingredients);
    this.name = name;
  }
}

class CookieFactory {
  static create(snack) {
    let array = []
    for (let i = 0; i < snack.length; i++) {
      if (snack[i][0].trim() == "peanut butter") {
        let peanut = new PeanutButter(snack[i][0].trim(), snack[i][1].split(','));
        array.push(peanut)
      } else if (snack[i][0].trim() == "chocolate chip") {
        let chocolate = new ChocolateChip(snack[i][0].trim(), snack[i][1].split(','));
        array.push(chocolate);
      } else {
        let otherCookies = new OtherCookie(snack[i][0].trim(), snack[i][1].split(','));
        otherCookies.bake()
        array.push(otherCookies);
      }
    }
    return array;
  }

  static cookieRecommendation(day, cookie) {
    let noSugar = []
    for (let i = 0; i < cookie.length; i++) {
      if (cookie[i].containSugar == false) {
        noSugar.push(cookie[i]);
      }
    }
    return noSugar;
  }
}

let batch_of_cookies = CookieFactory.create(snack);
console.log(batch_of_cookies);
console.log('=================================');
let sugarFree = CookieFactory.cookieRecommendation("tuesday", batch_of_cookies)
console.log('Sugar free cake(s):');
for (let n = 0; n < sugarFree.length; n++) {
  console.log(sugarFree[n].name);
}
console.log('=================================');
console.log('Reach Ingredients Object:');
console.log(batch_of_cookies[3].ingredients[1]);
