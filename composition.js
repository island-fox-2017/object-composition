"use strict"
const fs = require('fs');

//Reading File cookies.txt
class CookiesList {
  constructor(file){
    this.file = file
  }
  readFile(fileName, callback){
    let fileContent = fs.readFileSync(fileName, 'utf8');
    callback(fileContent);
  }

  readCookiestxt(){
    this.readFile(this.file, fileContent => {
      let cookie_split = fileContent.trim().split('\n');
      // let cookie_in = cookie_split[1].split('=')
      // console.log(cookie_split);
      // console.log(cookie_in);
      let cookie_name = []
      let cookie_ing = []
      let ing2d = []
      let ingObj = []

      for(let i = 0; i < cookie_split.length; i++){
        let x = cookie_split[i].split('=')
        cookie_name.push(x);
        cookie_ing.push(x[1]);
      }
      // console.log(cookie_name);
      // console.log(cookie_ing);
      for(let i = 0; i < cookie_ing.length; i++) {
        let ing_split = cookie_ing[i].toString().split(',')
        // let ing_s = ing_split.toString(':')
        ing2d.push(ing_split)
      }

      CookieFactory.create(cookie_name);
      // CookieFactory.cookieRecommendation(cookie_name);
    });
  }
}


class Cookie {
  constructor(nama, ingredients) {
    this.nama = nama
    this.status = 'mentah'
    this.ingredients = this.Ingredients(ingredients)
    this.containSugar = this.getSugar(ingredients)
  }

  Ingredients(ingredients){
    var newIng = []
    let split1 = ingredients.split(',')
    for(let i = 0; i < split1.length; i++){
      let split2 = split1[i].split(" : ")
      let obj = new Ingredient(split2)
      newIng.push(obj)
    }
    return newIng
    // console.log(JSON.stringify(newIng));
  }

  bake(){
    this.status = 'selesai dimasak'
  }

  getSugar(nosugar) {

    for(let i = 0; i < nosugar.length; i++) {
      if (/sugar/.test(nosugar) == nosugar[i]){ //bisa juga tanpa pembanding if (/sugar/.test(sugar))
        return 'Has Sugar'
      } else {
        CookieFactory.cookieRecommendation(this.nama)

        return 'Sugar Free'
      }

    }


  }
}

//Child of Cookie Class
class PeanutButter extends Cookie {
  constructor(nama,status,ingredients){
    super(nama,status,ingredients);
    this.name = 'peanut butter'
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(nama,status,ingredients){
    super(nama,status,ingredients);
    this.chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(nama,status,ingredients){
    super(nama,status,ingredients);
    this.other_count = 150
  }
}

//ingredients class
class Ingredient {
  constructor(options){
    this.name = options['name']
    this.amount = options['amount']
    // this.containSugar = options['sugar']
  }
}


//Factory Method
class CookieFactory {
  static create(options){
    // console.log(options.length);
    // let cookie_in = cookie_split[1].split('=')

    let MyCookies = []
    for(let i = 0; i < options.length; i++){
      if(options[i][0].trim() === 'peanut butter') {
        this.cookie = new PeanutButter(options[i][0], options[i][1]);
        MyCookies.push(this.cookie)
      } else if(options[i][0].trim() === 'chocolate chip') {
        this.cookie = new ChocolateChip(options[i][0], options[i][1]);
        MyCookies.push(this.cookie)
      } else {
        this.cookie = new OtherCookie(options[i][0], options[i][1]);
        MyCookies.push(this.cookie)
      }
    }
    console.log(MyCookies);
  }

  //static for ingredients
  static cookieRecommendation(day, cookiess) {
    let noSugar = []
    // for (let i = 0; i < cookiess.length; i++) {
    //   if (cookiess[i].containSugar == 'Sugar Free') {
        noSugar.push(cookiess);
    //   }
    // }
    return noSugar;
  }
}

let kue = new CookiesList('cookies.txt')
kue.readCookiestxt()

// let batch_of_cookies = CookieFactory.create(options)
// console.log(batch_of_cookies);
// let sugarFreeFoods = CookieFactory.cookieRecommendation("tuesday")

console.log('===================================');
console.log('====== SUGAR FREE CAKES ARE =======');
let sugarFree = CookieFactory.cookieRecommendation("tuesday");
console.log(sugarFree);
// for (let n = 0; n < sugarFree.length; n++) {
//   console.log(sugarFree[n].name);
// }
console.log('===================================');
