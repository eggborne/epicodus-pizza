# Epicodus Pizza Parlor
#### Special Project #4 for Epicodus, 27 January 2023
### by Mike Donovan

[Visit at GitHub Pages](https://eggborne.github.io/epicodus-pizza)

## Description

A website that allows a user to customize and order a fake pizza.

## Technologies Used:
* HTML
* CSS
* JavaScript

## Setup/Installation Instructions

Open a terminal and clone this repository by typing:

> git clone https://github.com/eggborne/epicodus-pizza

Navigate to the cloned directory and open index.html in your favorite web browser.

## Known Bugs

No known bugs.

## Legal

This software has no license.

### Tests

> Describe: Pizza()

```
Test: "It should produce a Pizza object with the specified options"
Code: {
  const pizza = new Pizza({
    size: 'large',
    crust: 'handTossed',
    toppings: ['redPeppers', 'pineapple'],
    specialInstructions: ['well done']
  });
  return [ pizza.size, pizza.crust, pizza.toppings, pizza.specialInstructions ];
}
Expected Output: [ "large", "handTossed", [ "redPeppers", "pineapple" ], [ "well done" ] ]

Test: "It should produce a Pizza object that can refer to its own optionData property to find the non-camelCase display names of toppings and crust types"
Code: {
  const pizza = new Pizza({
    size: 'large',
    crust: 'deepDish',
    toppings: ['redPeppers', 'pineapple'],
    specialInstructions: ['well done']
  });
  return [ pizza.optionData.toppings['redPeppers'].displayName, pizza.optionData.crusts['handTossed'].displayName ];
}
Expected Output: [ "Red Peppers", "Deep Dish" ]

Test: "It should produce a Pizza object that can refer to its own priceData property to find the prices for a given size and crust type"
Code: {
  const pizza = new Pizza({
    size: 'large',
    crust: 'deepDish',
    toppings: ['redPeppers', 'pineapple'],
    specialInstructions: ['well done']
  });
  return [ pizza.priceData.sizes['medium'], pizza.priceData.crusts['thin'] ];
}
Expected Output: [ 9.95, 1 ]

Test: "It should produce a Pizza object that can find the type (standard or premium) of a given topping"
Code: {
  const pizza = new Pizza({
    size: 'large',
    crust: 'deepDish',
    toppings: ['redPeppers', 'pineapple'],
    specialInstructions: ['well done']
  });
  return [ pizza.optionData.toppings['spinach'].type, pizza.optionData.toppings['falafel'].type];
}
Expected Output: [ 'standard', 'premium' ]

Test: "It should produce a Pizza object that can find the price for a given topping at a given size"
Code: {
  const pizza = new Pizza({
    size: 'large',
    crust: 'deepDish',
    toppings: ['redPeppers', 'pineapple'],
    specialInstructions: ['well done']
  });
  return [ 
    pizza.priceData.toppings[pizza.optionData.toppings['blackOlives'].type]['small'], 
    pizza.priceData.toppings[pizza.optionData.toppings['pineapple'].type]['large']
  ];
}
Expected Output: [ 0.95, 3.50 ]

Test: "It should produce a Pizza object that can find the prices associated with its user-set options"
Code: {
  const pizza = new Pizza({
    size: 'large',
    crust: 'deepDish',
    toppings: ['redPeppers', 'pineapple'],
    specialInstructions: ['well done']
  });
  return [ 
    pizza.priceData.sizes[pizza.size], 
    pizza.priceData.crusts[pizza.crust], 
    pizza.priceData.toppings[pizza.optionData.toppings[pizza.toppings[0]].type][pizza.size], 
    pizza.priceData.toppings[pizza.optionData.toppings[pizza.toppings[1]].type][pizza.size], 
  ];
}
Expected Output: [ 12.95, 2, 2.5, 3.5 ]
```


> Describe: Pizza.prototype.getPrice()

```
Test: "It should output the correct base price for a given pizza size"
Code: {
  let smallPizza = new Pizza({
    size: 'small',
    crust: 'handTossed',
    toppings: [],
    specialInstructions: []
  });
  let largePizza = new Pizza({
    size: 'large',
    crust: 'handTossed',
    toppings: [],
    specialInstructions: []
  });
  return [smallPizza.getPrice(), largePizza.getPrice()];
}
Expected Output: [ 7.95, 12.95 ]

```