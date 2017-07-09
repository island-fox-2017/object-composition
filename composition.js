"use strict"
let fs = require("fs");
class Cookie {
  constructor(name, ingredients) {
    this.name = name;
    this.status = "mentah";
    this.ingredients = this.pecah(ingredients);
    this.has_sugar = /sugar/.test(ingredients)
  }
  bake(){
    this.status = "selesai dimasak";
  }
  pecah(ingredients){
    let split1 = ingredients.split(",")
    let tempSplit = [];
    for(let i = 0; i<split1.length; i++){
      let split2 = split1[i].split(" : ");
      let objj= new Ingredients(split2)
      tempSplit.push(objj);
    }
    return tempSplit;
    console.log(split1);
  }

}
class PeanutButter extends Cookie {
  constructor(nama, status, ingredients) {
    super(nama, status, ingredients)
    this.peanut_count = 100
  }
}
class ChocholateChip extends Cookie {
  constructor(nama, status, ingredients) {
    super(nama, status, ingredients);
    this.choc_chip_count = 200
  }
}
class OtherCookie extends Cookie {
  constructor(nama, status, ingredients) {
    super(nama, status, ingredients);
    this.other_count = 150
  }
}
//==================================
class Ingredients {
  constructor(options) {
    this.name = options[0];
    this.amount = options[1];

  }
}
//==================================
class CookieFactory {
  constructor() {
  }
  static create(option) {
    let arrTemp = [];
    let arrTempObj = [];
    let test = []
    for(let i = 0; i<option.length; i++){
      let arrSplit = option[i].split(" = ")
      // console.log("-----"+arrSplit);
      // test.push(arrSplit[1].split(","));
        if(arrSplit[0] == "peanut butter"){

          arrTemp.push(new PeanutButter(arrSplit[0], arrSplit[1]))
          console.log("============"+arrSplit[1]);
        }
        else if(arrSplit[0] == "chocolate chip"){
          arrTemp.push(new ChocholateChip(arrSplit[0], arrSplit[1]))
        }
        else if (arrSplit[0] == "chocolate cheese"){
          arrTemp.push(new OtherCookie(arrSplit[0], arrSplit[1]))
        }
        else if (arrSplit[0] == "chocolate butter") {
          arrTemp.push(new OtherCookie(arrSplit[0], arrSplit[1]))
        }
    }


    return arrTemp;

  }
  static cookieRecom(hari, ket){
    let arrKosong = [];
    for(let i = 0; i < ket.length; i++){
      if(ket[i].has_sugar == false){
        arrKosong.push(ket[i].name);
      }
    }
    return arrKosong;
  }
}
let parse = fs.readFileSync("cookies.txt").toString().split("\n");
let cookies = CookieFactory.create(parse)


console.log(JSON.stringify(cookies, null, 2));
// console.log(parse);
let sugar = CookieFactory.cookieRecom("Selasa", cookies)
console.log(sugar.toString());
