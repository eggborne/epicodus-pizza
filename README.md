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

### Tests

> Describe: Pizza()

```
Test: "It should produce a Pizza object with the specified options as properties"
Code: {
  const pizza = new Pizza({
    size: 'large',
    crust: 'handTossed',
    toppings: ['redPeppers', 'pineapple'],
    specialInstructions: ['well done']
  });
  return [ pizza.size, pizza.crust, pizza.toppings, pizza.specialInstructions ];
}
Expected Output: [ 
  "large", 
  "handTossed", 
  [ "redPeppers", "pineapple" ], 
  [ "well done" ] 
]

Test: "It should produce a Pizza object that can find the non-camelCase display names of toppings and crust types"
Code: {
  const pizza = new Pizza();
  return [ pizza.optionData.toppings['greenPeppers'].displayName, pizza.optionData.toppings['skittles'].displayName, pizza.optionData.crusts['handTossed'].displayName ];
}
Expected Output: [ 'Green Peppers', 'Skittles®', 'Hand-Tossed' ]

Test: "It should produce a Pizza object that can find the price for a given size and crust type"
Code: {
  const pizza = new Pizza({
    size: 'large',
    crust: 'deepDish',
  });
  return [ pizza.priceData.sizes['medium'], pizza.priceData.crusts['thin'] ];
}
Expected Output: [ 9.95, 1 ]

Test: "It should produce a Pizza object that can find the type (standard or premium) of a given topping"
Code: {
  const pizza = new Pizza();
  return [ pizza.optionData.toppings['spinach'].type, pizza.optionData.toppings['falafel'].type];
}
Expected Output: [ 'standard', 'premium' ]

Test: "It should produce a Pizza object that can find the price for a given topping at a given size"
Code: {
  const pizza = new Pizza();
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

> Describe: Pizza.prototype.getPriceTotal()

```
Test: "It should output the correct price for a given pizza size"
Code: {
  let smallPizza = new Pizza({
    size: 'small',
  });
  let largePizza = new Pizza({
    size: 'large',
  });
  return [smallPizza.getPriceTotal(), largePizza.getPriceTotal()];
}
Expected Output: [ 7.95, 12.95 ]

Test: "It should output the correct price for a given pizza crust type"
Code: {
  let pizza = new Pizza({
    size: 'large',
    crust: 'handTossed',
  });
  let deepDishPizza = new Pizza({
    size: 'large',
    crust: 'deepDish',
  });
  return [pizza.getPriceTotal(), deepDishPizza.getPriceTotal()];
}
Expected Output: [ 12.95, 14.95 ]

Test: "It should output the correct price for a pizza of given size, crust type, and toppings"
Code: {
  let smallPlainPizza = new Pizza({
    size: 'small',
  });
  let mediumThinCrustPizza = new Pizza({
    size: 'medium',
    crust: 'thin',
  });
  let largeSpinachPizza = new Pizza({
    size: 'large',
    toppings: ['spinach'],
  });
  let largeDeepDishGarlicFalafelPizza = new Pizza({
    size: 'large',
    crust: 'deepDish',
    toppings: ['garlic', 'falafel'],
  });
  return [
    smallPlainPizza.getPriceTotal(), 
    mediumThinCrustPizza.getPriceTotal(),
    largeSpinachPizza.getPriceTotal(), 
    largeDeepDishGarlicFalafelPizza.getPriceTotal(),
  ];
}
Expected Output: [ 7.95, 10.95, 15.45, 20.95 ]

```

## Legal

MIT License

Copyright (c) 2023 Mike Donovan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
