let pizza;

window.addEventListener('load', function() {
  document.getElementById('start-order-button').addEventListener('click', function(e) {
    e.preventDefault();
    pizza = new Pizza();
    pizza.createOptionInputs();
    pizza.createOptionHandlers();
    document.querySelector('main').classList.add('ordering');
  });
});

function Pizza(options={}) {
  this.size = options.size || 'large';
  this.crust = options.crust || 'handTossed';
  this.toppings = options.toppings || [];
  this.specialInstructions = options.specialInstructions || [];
  this.currentPrice = 0;

  this.optionData = {
    sizes: {
      small: {
        displayName: 'Small'
      },
      medium: {
        displayName: 'Medium'
      },
      large: {
        displayName: 'Large'
      },
    },
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

Pizza.prototype.createOptionInputs = function() {
  let sizeRadioArea = document.createElement('div');
  let toppingCheckboxArea = document.createElement('div');
  let crustSelectArea = document.createElement('select');
  sizeRadioArea.id = 'size-radio-area';
  toppingCheckboxArea.id = 'topping-checkbox-area';
  crustSelectArea.id = 'crust-select';

  
  for (let optionType in this.optionData) {
    for (let itemKey in this.optionData[optionType]) {
      let item = this.optionData[optionType][itemKey];
      switch (optionType) {
        case 'sizes':
          sizeRadioArea.innerHTML += `
            <div>
              <label for="${itemKey}">${item.displayName}</label>
              <input type="radio" id="${itemKey}" name="size" value="${itemKey}" ${itemKey === 'large' && 'checked'}>
            </div>
          `;          
          break;
        case 'toppings':
          toppingCheckboxArea.innerHTML += `
            <div>
              <label for="${itemKey}">${item.displayName}</label>
              <input type="checkbox" name="${itemKey}" value="${itemKey}">
            </div>
          `;          
          break;

        case 'crusts':
          crustSelectArea.innerHTML += `
            <option value="${itemKey}">${item.displayName}</option>
          `;
          break;
      }
    }
  }
  document.getElementById('option-input-area').append(sizeRadioArea);
  document.getElementById('option-input-area').append(crustSelectArea);
  document.getElementById('option-input-area').append(toppingCheckboxArea);
}

Pizza.prototype.createOptionHandlers = function() {
  document.getElementById('crust-select').addEventListener('change', (e) => {
    this.crust = e.target.value;
    document.querySelector('#invoice-area > span').innerText = this.getPriceTotal();
  });
  let optionInputs = document.getElementsByTagName('input');
  for (const optionInput of optionInputs) {
    optionInput.addEventListener('change', (e) => {
      if (e.target.checked) {
        if (optionInput.type === 'radio') {
          this.size = e.target.value;
        } else {
          this.toppings.push(e.target.value);
        }
      } else {
        if (this.toppings.indexOf(e.target.value) !== -1) {
          this.toppings.splice(this.toppings.indexOf(e.target.value), 1);
        }
      }
      document.querySelector('#invoice-area > span').innerText = this.getPriceTotal().toFixed(2);
    });
  }
}