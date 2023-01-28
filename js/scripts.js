let pizza;

window.addEventListener('load', function() {
  document.getElementById('start-order-button').addEventListener('click', function(e) {
    e.preventDefault();
    pizza = new Pizza();
    pizza.createOptionInputs();
    pizza.createOptionHandlers();
    document.querySelector('header').classList.add('ordering');
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
      standard: {
        greenPeppers: {
          displayName: 'Green Peppers',
        },
        redPeppers: {
          displayName: 'Red Peppers',
        },
        blackOlives: {
          displayName: 'Black Olives',
        },
        spinach: {
          displayName: 'Spinach',
        },
        garlic: {
          displayName: 'Garlic',
        },
        onions: {
          displayName: 'Onions',
        },
        jalapenos: {
          displayName: 'Jalapenos',
        },
      }, 
      premium: {
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
      }
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
      handTossed: null,
      thin: 1,
      deepDish: 2,
    },
    toppings: {
      standard: {
        small: 0.95,
        medium: 1.95,
        large: 2.50,
      },
      premium: {
        small: 1.95,
        medium: 2.95,
        large: 3.50,
      }
    }
  };
}

Pizza.prototype.getPriceTotal = function() {
  let baseSizeCost = this.priceData.sizes[this.size];
  let baseCrustCost = this.priceData.crusts[this.crust];
  let toppingsCost = 0;
  this.toppings.forEach((topping) => {
    let toppingType =  topping in this.optionData.toppings.standard ? 'standard' : 'premium';
    toppingsCost += this.priceData.toppings[toppingType][this.size];
  });
  return baseSizeCost + baseCrustCost + toppingsCost;
}

Pizza.prototype.createOptionInputs = function() {
  let sizeRadioArea = document.createElement('div');
  let toppingCheckboxArea = document.createElement('div');
  let crustSelectArea = document.createElement('div');
  sizeRadioArea.id = 'size-radio-area';
  toppingCheckboxArea.id = 'topping-checkbox-area';
  crustSelectArea.id = 'crust-select-area';
  sizeRadioArea.innerHTML += `
    <div class="input-header"><h4>Size</h4></div>
  `;
  crustSelectArea.innerHTML += `
    <div class="input-header"><h4>Crust Style</h4></div>
  `;
  let crustSelectBox = document.createElement('select');
  crustSelectBox.id = 'crust-select';
  crustSelectArea.append(crustSelectBox);
  for (let optionType in this.optionData) {
    for (let itemKey in this.optionData[optionType]) {
      let item = this.optionData[optionType][itemKey];
      switch (optionType) {
        case 'sizes':
          sizeRadioArea.innerHTML += `
            <div>
              <label for="${itemKey}">${item.displayName}</label>
              <div class="inline-price">$${this.priceData.sizes[itemKey]}</div>
              <input type="radio" id="${itemKey}" name="size" value="${itemKey}" ${itemKey === 'large' && 'checked'}>
            </div>
          `;
          break;
        case 'toppings':
          if (true || itemKey === 'standard') {
            let checkboxSection = document.createElement('div');
            checkboxSection.classList.add('checkbox-section');
            checkboxSection.innerHTML = `
              <div class="input-header">
                <h4>${itemKey[0].toUpperCase() + itemKey.slice(1)} toppings</h4>
                <div class="header-price-display">
                  <div class="size-price-grid">
                    <div>${this.optionData.sizes.small.displayName}</div>
                    <div>${this.optionData.sizes.medium.displayName}</div>
                    <div>${this.optionData.sizes.large.displayName}</div>
                    <div>$${this.priceData.toppings[itemKey].small.toFixed(2)}</div>
                    <div>$${this.priceData.toppings[itemKey].medium.toFixed(2)}</div>
                    <div>$${this.priceData.toppings[itemKey].large.toFixed(2)}</div>
                  <div>
                </div>
              </div>
            `;
            toppingCheckboxArea.append(checkboxSection);
            for (let toppingKey in item) {
              checkboxSection.innerHTML += `
              <div class="checkbox-row">
                <label for="${toppingKey}-checkbox">${item[toppingKey].displayName}</label>
                <input type="checkbox" id="${toppingKey}-checkbox" name="${toppingKey}" value="${toppingKey}">
              </div>
            `;   
            }
          }        
          break;
        case 'crusts':
          let displayPrice = this.priceData.crusts[itemKey] ? '+$' + this.priceData.crusts[itemKey].toFixed(2) : '';
          crustSelectBox.innerHTML += `
            <option value="${itemKey}">
              <p>${item.displayName}</p>
              <p>${displayPrice}</p>
            </option>
          `;
          break;
      }
    }
  }
  document.getElementById('option-input-area').append(sizeRadioArea, crustSelectArea, toppingCheckboxArea);
}

Pizza.prototype.createOptionHandlers = function() {
  document.getElementById('crust-select').addEventListener('change', (e) => {
    this.crust = e.target.value;
    document.querySelector('#total-price-display > span').innerText = this.getPriceTotal();
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
      document.querySelector('#total-price-display > span').innerText = this.getPriceTotal().toFixed(2);
    });
  }
}