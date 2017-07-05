let fs = require('fs')
let option = fs.readFileSync('cookies.txt', 'utf8').trim().split('\n') // nyambung-nyambungin method

class Ingredients {
  constructor(name,amount) {
    this.name = name
    this.amount = amount
  }
}

//Parent
class Cookie {
  constructor(name) {
    this.name = name
    this.ingredients = "";
    this.status = "mentah"
  }

  pisah(bahanPisah) {
    let splitArr = []
    // let splitArr1 = []
    for (let i = 0; i < bahanPisah.length; i++) {
      splitArr.push(bahanPisah[i])
    }
    return splitArr
  }

  pisahIng(ingred){
    let ing=ingred.split(",")
    let ing2 = []
    let ing3 = {}
    let ing4 = []
    for(let i=0; i<ing.length; i++){
      ing2.push(ing[i].split(":"))
      ing3 = new Ingredients(ing2[i][1],ing2[i][0])
      ing4.push(ing3)
    }
    // return ing2
    return JSON.stringify(ing4,null);
  }

  bake() {
    this.status = "selesai dimasak"
  }
}

//Child
class PeanutButter extends Cookie {
  constructor(name, ingred) {
    super(name)
    this.ingredients = this.pisahIng(ingred)
    this.peanut_count = 100
  }
}

class ChocolateCheese extends Cookie {
  constructor(name, ingred) {
    super(name)
    this.ingredients = this.pisahIng(ingred)
    this.choc_cheese_count = 200
  }
}

class ChocolateButter extends Cookie {
  constructor(name, ingred) {
    super(name)
    this.ingredients = this.pisahIng(ingred)
    this.choc_butter_count = 150
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingred) {
    super(name)
    this.ingredients = this.pisahIng(ingred)
    this.choc_chip_count = 150
  }
}

//=================================Factory Method===============================//

class CookieFactory {
  static create(option) {
    let arrCookie = [];
    let arr = '';
    for (let i = 0; i < option.length; i++) {
      arr = option[i].split(" = ")
      if (arr[0] === "peanut butter") {
        arrCookie.push(new PeanutButter(arr[0], arr[1]))
      } else if (arr[0] === "chocolate chip") {
        arrCookie.push(new ChocolateChip(arr[0], arr[1]))
      } else if (arr[0] === "chocolate cheese") {
        arrCookie.push(new ChocolateCheese(arr[0], arr[1]))
      } else if (arr[0] === "chocolate butter") {
        arrCookie.push(new ChocolateButter(arr[0], arr[1]))
      }
    }
    return arrCookie
  }
}


let batch_of_cookies = CookieFactory.create(option);
console.log(batch_of_cookies);

// let test = new Cookie()
// console.log(test.pisah(bahanPisah));
