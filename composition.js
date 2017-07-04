"use strict"
const fs = require('fs');
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
      // console.log(cookie_split);
      CookieFactory.create(cookie_split);
    });
  }
}


class Cookie {
  constructor(nama) {
    this.nama = nama
    this.status = 'mentah'
    this.ingredients = []
  }

  bake(){
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(nama,status,ingredients){
    super(nama);
    this.name = 'peanut butter'
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(nama,status,ingredients){
    super(nama);
    this.chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(nama,status,ingredients){
    super(nama);
    this.other_count = 150
  }
}

//Factory Method
class CookieFactory {
  static create(options){
    // console.log(options.length);
    let MyCookies = []
    for(let i = 0; i < options.length; i++){
      if(options[i] === 'peanut butter') {
        this.cookie = new PeanutButter(options[i]);
        MyCookies.push(this.cookie)
      } else if(options[i] === 'chocolate chip') {
        this.cookie = new PeanutButter(options[i]);
        MyCookies.push(this.cookie)
      } else {
        this.cookie = new OtherCookie(options[i]);
        MyCookies.push(this.cookie)
      }
    }
    console.log(MyCookies);
  }
}

let kue = new CookiesList('cookies.txt')
kue.readCookiestxt()
