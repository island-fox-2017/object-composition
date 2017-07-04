'use strict'
const fs = require('fs')
var options = fs.readFileSync('cookies.txt').toString().trim().split('\n')

class Cookie {
  constructor(name) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = []
  }

  bake() {
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super(name)
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name) {
    super(name)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super(name)
    this.other_cookie_count = 150
  }
}

class CookieFactory {
  constructor() {

  }

  static create(options) {
    let arrCookie = []
    for (let i=0; i<options.length; i++) {
      if (options[i] == 'peanut butter') {
        arrCookie.push(new PeanutButter(options[i]))
      }
      else if (options[i] == 'chocolate chip') {
        arrCookie.push(new ChocholateChip(options[i]))
      }
      else {
        arrCookie.push(new OtherCookie('Other Cookie'))
      }
    }
    return arrCookie
  }
}


let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);
