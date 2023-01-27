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

Test: "It should produce a Pizza object that can refer to its own properties to find the extra charge associated with different options"
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
    pizza.priceData.toppings[pizza.toppingData[pizza.toppings[0]].type][pizza.size], 
    pizza.priceData.toppings[pizza.toppingData[pizza.toppings[1]].type][pizza.size], 
  ];
}
Expected Output: [ 12.95, 2, 2.5, 3.5 ]
```
