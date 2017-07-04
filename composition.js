'use strict'
const fs = require('fs');

class Cookie {
  constructor(name, bahan){
    this.name = name;
    this.status = 'mentah';
    this.ingredients = bahan;
  }

  bake(){
    this.status = 'selesai dimasak';
  }
}

class Ingredients{
  constructor(option){
    this.name = option['name'];
    this.amount = option['amount'];
    this.has_sugar = option['has_sugar'];
  }
}

class PeanutButter extends Cookie{
  constructor(name, bahan){
    super(name, bahan);
    this.peanut_count = 100;
  }
}

class ChocholateChip extends Cookie{
  constructor(name, bahan){
    super(name, bahan);
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie{
  constructor(name, bahan){
    super(name, bahan);
    this.other_count = 150;
  }
}

class CookieFactory{
  static create(option){

    const data = fs.readFileSync(option).toString().trim().split('\n');

    let listCookies = [];
    for(let i = 0; i < data.length; i++)
    {
      let temp = data[i].split('=');
      let name = temp[0];
      let bahan = temp[1].trim().split('\n');
      let arrBahan;

      // console.log(arrBahan);

      if(name == 'peanut butter')
      {
        arrBahan = CookieFactory.parseBahan(bahan);
        listCookies.push(new PeanutButter(name, arrBahan));
      }
      else if(name == 'chocolate chip')
      {
        arrBahan = CookieFactory.parseBahan(bahan);
        listCookies.push(new ChocholateChip(name, arrBahan));
      }
      else
      {
        arrBahan = CookieFactory.parseBahan(bahan);
        listCookies.push(new OtherCookie(name, arrBahan));
      }
    }

    return listCookies;
  }

  static parseBahan(bahan){
    let array = bahan[0].split(',');
    let result = [];
    for(let i = 0; i < array.length; i++)
    {
      let obj = {};
      let temp = array[i].trim().split(':');
      for(let j = 0; j < temp.length; j++)
      {
        obj['name'] = temp[1];
        obj['amount'] = temp[0];
        if(temp[1].trim() == 'sugar')
        {
          obj['has_sugar'] = true;
        }
        else
        {
          obj['has_sugar'] = false;
        }
      }
      result.push(new Ingredients(obj));
    }
    // console.log(result);
    return result;
  }

  static cookieRecommendation(option, day = null){
    let listObjectCookies = option;
    let result = [];

    if(day == 'tuesday')
    {
      for(let i = 0; i < listObjectCookies.length; i++)
      {
        if(CookieFactory.checkSugar(listObjectCookies[i]))
        {
          result.push(listObjectCookies[i].name);
        }
      }
    }
    else
    {
      for(let i = 0; i < listObjectCookies.length; i++)
      {
        result.push(listObjectCookies[i].name)
      }
    }

    return result;
  }

  static checkSugar(list){
    for(let j = 0; j < list.ingredients.length; j++)
    {
      if(list.ingredients[j].has_sugar == true)
      {
        return false;
      }
    }
    return true;
  }

}

//MAIN

// console.log(JSON.stringify(CookieFactory.create('cookies.txt'),null,2));
console.log('List Sugar free Recommendation');
let kue = CookieFactory.create('cookies.txt')
let sugarLess = CookieFactory.cookieRecommendation(kue, 'tuesday');
for(let i = 0; i < sugarLess.length; i++ )
{
  console.log(`${i+1}. kue ${sugarLess[i]}`);
}

console.log('\n');
console.log('List all cookies Recommendation');
let cookies = CookieFactory.cookieRecommendation(kue);
for(let i = 0; i < cookies.length; i++ )
{
  console.log(`${i+1}. kue ${cookies[i]}`);
}
