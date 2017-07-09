"use strict"

const fs = require('fs');
let options = fs.readFileSync('cookies.txt', 'utf-8').split('\n');

// let ingredientsFile = fs.readFileSync('ingredients.txt', 'utf-8').split('\n');
// 
// //LOOPING TO GET NAME AND AMOUNT
// let ingr = [];
// for (var i = 0; i < ingredientsFile.length; i++) {
//   ingr.push(ingredientsFile[i].split(' = '))
// }
// 
// console.log(ingr);

//Isi dari options adalah array
/*
[ 'peanut butter',
  'chocolate chip',
  'chocolate cheese',
  'chocolate butter' ]
*/

/*=====PARENT CLASS=====*/
//INHERITANCE
class Ingredients {
  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
  }
  
}//class

class Cookie {
  constructor(name) {
    this.cookie_name = name;
    this.ingredients = [];
    this.status = 'mentah';
    // this.getIngredients();
  }
  
  bake() {
    this.status = 'selesai dimasak';
  }
  
  // getIngredients() {
  //   let ingredientsFile = fs.readFileSync('ingredients.txt', 'utf-8').split('\n');
  // 
  //   //LOOPING TO GET NAME AND AMOUNT
  //   for (var i = 0; i < ingredientsFile.length; i++) {
  //     let ing = ingredientsFile[i].split
  //   }
  // }
}//class



/*=====CHILD FROM PARENT=====*/
//INHERITANCE
class PeanutButter extends Cookie {
  constructor(name) {
    super(name);
    this.peanut_count = 100;
  }
}//class

//CHILD FROM PARENT
class ChocholateChip extends Cookie {
  constructor(name) {
    super(name);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name);
    this.other_count = 150;
  }
}

//FACTORY METHOD
class CookieFactory {
  static create(options) {
    var cookie = []
    
    for (let i = 0; i < options.length; i++) {
      if (options[i] === 'peanut butter'){
        cookie.push(new PeanutButter(options[i]));
      } else if (options[i] === 'chocolate chip') {
        cookie.push(new ChocholateChip(options[i]));
      } else if (options[i] === 'chocolate cheese') {
        cookie.push(new OtherCookie(options[i]));
      } else if (options[i] === 'chocolate butter') {
        cookie.push(new OtherCookie(options[i]));
      }
    }//for
    return cookie;
  }//static
}//class

//CALLING THE VARIABLE THAT CONTAINS RESULT FROM THE FACTORY METHOD ABOVE
let batch_of_cookies = CookieFactory.create(options);
// console.log(batch_of_cookies);
// console.log(JSON.stringify(batch_of_cookies,null,2));









//ARCHIVE
//////=======COBA=======/////////

let ingredientsFile = fs.readFileSync('ingredients.txt', 'utf-8').split('\n');
//ADVANCED SPLITED BY REMOVING '=' BETWEEN NAME AND AMOUNT 
let amount = [];
let name = [];

for (var i = 0; i < ingredientsFile.length; i++) {
  let cookieIngredients = 
}



// let amount2 = []
// for (let i = 0; i < amount.length; i++) {
//   amount2.push(amount[i].split(','));
// }

// console.log(ingredientsSplited);
console.log(amount);

// //PUT THE ARRAY INTO OBJECT INGREDIENTS WITH LOOPING
// let arrayOfObject = []
// console.log(cookieName);
// for (let i = 0; i < cookieName.length; i++) {
//   arrayOfObject.push(new Ingredients(cookieName[i], amount[i]));
// }

// /////====COBA====///////
