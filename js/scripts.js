function Pizza(options={}) {
  this.size = options.size || 'large';
  this.crust = options.crust || 'handTossed';
  this.toppings = options.toppings || [];
  this.specialInstructions = options.specialInstructions || [];

  this.optionData = {
    toppings: {
      greenPeppers: {
        displayName: 'Green Peppers',
        type: 'standard',
      },
      redPeppers: {
        displayName: 'Red Peppers',
        type: 'standard',
      },
      blackOlives: {
        displayName: 'Black Olives',
        type: 'standard',
      },
      spinach: {
        displayName: 'Spinach',
        type: 'standard',
      },
      garlic: {
        displayName: 'Garlic',
        type: 'standard',
      },
      onions: {
        displayName: 'Onions',
        type: 'standard',
      },
      jalapenos: {
        displayName: 'Jalapenos',
        type: 'standard',
      },
      pineapple: {
        displayName: 'Pineapple',
        type: 'premium',
      },
      falafel: {
        displayName: 'Falafel',
        type: 'premium',
      },
      skittles: {
        displayName: 'Skittles®',
        type: 'premium',
      },
    },
    crusts: {
      handTossed: {
        displayName: 'Hand-Tossed',
      },
      thin: {
        displayName: 'Thin Crust',
      },
      deepDish: {
        displayName: 'Deep Dish',
      },
    },
  },

  this.priceData = {
    sizes: {
      small: 7.95,
      medium: 9.95,
      large: 12.95,
    },
    crusts: {
      handTossed: 0,
      thin: 1,
      deepDish: 2
    },
    toppings: {
      standard: {
        small: 0.95,
        medium: 1.95,
        large: 2.50
      },
      premium: {
        small: 1.95,
        medium: 2.95,
        large: 3.50
      }
    }
  };
}

Pizza.prototype.getPriceTotal = function() {
  let baseSizeCost = this.priceData.sizes[this.size];
  let baseCrustCost = this.priceData.crusts[this.crust];
  let toppingsCost = 0;
  this.toppings.forEach((topping) => {
    let toppingType = this.optionData.toppings[topping].type;
    toppingsCost += this.priceData.toppings[toppingType][this.size];
  });
  return baseSizeCost + baseCrustCost + toppingsCost;
} 