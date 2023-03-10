window.addEventListener('load', async function() {
  document.getElementById('start-order-button').addEventListener('click', function(e) {
    e.preventDefault();
    new PizzaParlor().produceDefaultPizza();
    document.querySelector('header').classList.add('ordering');
    document.querySelector('main').classList.add('ordering');
  });
});

function PizzaParlor() {
  this.pizzas = {};
  this.pizzaTypes = {
    classic: {
      optionData:  {
        sizes: {
          small: { toppingAmount: 16, toppingSize: '21%', displayName: 'Small' },
          medium: { toppingAmount: 20, toppingSize: '18%', displayName: 'Medium' }, 
          large: { toppingAmount: 26, toppingSize: '15%', displayName: 'Large' },
          xl: { toppingAmount: 36, toppingSize: '12%', displayName: 'XL' },
        },
        toppings: {
          standard: {
            greenPeppers: { displayName: 'Green Peppers', },
            redPeppers: { displayName: 'Red Peppers', },
            blackOlives: { displayName: 'Black Olives', },
            spinach: { displayName: 'Spinach', },
            garlic: { displayName: 'Garlic', },
            onions: { displayName: 'Onions', },
            jalapenos: { displayName: 'Jalapeños', },
            tomato: { displayName: 'Tomato', },
          }, 
          premium: {
            pineapple: { displayName: 'Pineapple', },
            falafel: { displayName: 'Falafel', },
            skittles: { displayName: 'Skittles®', },
          }
        },
        crusts: {
          handTossed: { displayName: 'Hand-Tossed', },
          thin: { displayName: 'Thin Crust', },
          deepDish: { displayName: 'Deep Dish', },
        },
      },
      priceData: {
        sizes: { small: 7.95, medium: 9.95, large: 12.95, xl: 15.95, },
        crusts: { handTossed: null, thin: 1, deepDish: 2, },
        toppings: { 
          standard: { small: 0.95, medium: 1.95, large: 2.50, xl: 4.00, },
          premium: { small: 1.95, medium: 2.95, large: 3.50, xl: 5.00, },
        }
      }
    }
  }
  this.currentId = 0;
  this.editingPizza;
}

function Pizza(options={}) {
  this.size = options.size || 'large';
  this.crust = options.crust || 'handTossed';
  this.toppings = options.toppings || [];
  this.specialInstructions = options.specialInstructions || [];
  this.optionData = options.optionData;
  this.priceData = options.priceData;
  this.pizzaType = options.pizzaType;
  this.id = options.id;
}

// Business logic

PizzaParlor.prototype.getNewID = function() {
  this.currentId++;
  return this.currentId;
}

PizzaParlor.prototype.addPizza = function(pizzaType) {
  let newId = this.getNewID();
  let newPizza = new Pizza({
    optionData: this.pizzaTypes[pizzaType].optionData, 
    priceData: this.pizzaTypes[pizzaType].priceData,
    id: newId,
    pizzaType,
  });
  this.pizzas[newId] = newPizza;
}

Pizza.prototype.getPriceTotal = function() {
  let baseSizeCost = this.priceData.sizes[this.size];
  let baseCrustCost = this.priceData.crusts[this.crust];
  let toppingsCost = this.getTotalToppingPrice();
  return baseSizeCost + baseCrustCost + toppingsCost;
};

Pizza.prototype.getTotalToppingPrice = function() {
  let toppingsCost = 0;
  this.toppings.forEach((topping) => {
    let toppingType = this.getToppingType(topping);
    toppingsCost += this.priceData.toppings[toppingType][this.size];
  });
  return toppingsCost;
};

Pizza.prototype.getToppingType = function(topping) {
  return topping in this.optionData.toppings.standard ? 'standard' : 'premium';
};

// UI logic

PizzaParlor.prototype.renderMenuForPizza = function(pizzaId) {
  this.pizzas[pizzaId].createOptionInputs();
  this.pizzas[pizzaId].createOptionHandlers();
};

PizzaParlor.prototype.renderPreviewForPizza = function(pizzaId) {
  let previewArea = document.getElementById(`preview-area`);
  let pizza = this.pizzas[pizzaId];
  previewArea.innerHTML += `
    <div class="preview-pizza ${pizza.pizzaType} ${pizza.size}" id="preview-pizza-${pizzaId}">
      <span role="img" aria-label="A delicious pizza."></span>
    </div>
  `;
};

PizzaParlor.prototype.renderInvoiceForPizza = function(pizzaId) {
  let pizza = this.pizzas[pizzaId];
  pizza.printInvoice();
};

PizzaParlor.prototype.produceDefaultPizza = function() {
  this.addPizza('classic');
  this.editingPizza = this.currentId;
  this.renderMenuForPizza(this.currentId);
  this.renderPreviewForPizza(this.currentId);
  this.pizzas[this.currentId].printInvoice();
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
            <div class="size-radio-row">
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
                    <div>${this.optionData.sizes.small.displayName[0]}</div>
                    <div>${this.optionData.sizes.medium.displayName[0]}</div>
                    <div>${this.optionData.sizes.large.displayName[0]}</div>
                    <div>XL</div>
                    <div>$${this.priceData.toppings[itemKey].small.toFixed(2)}</div>
                    <div>$${this.priceData.toppings[itemKey].medium.toFixed(2)}</div>
                    <div>$${this.priceData.toppings[itemKey].large.toFixed(2)}</div>
                    <div>$${this.priceData.toppings[itemKey].xl.toFixed(2)}</div>
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
};

Pizza.prototype.createOptionHandlers = function() {
  document.getElementById('crust-select').addEventListener('change', (e) => {
    this.crust = e.target.value;
    document.querySelector('#total-price-display > span').innerText = this.getPriceTotal();
    this.printInvoice();
  });
  let optionInputs = document.getElementsByTagName('input');
  for (const optionInput of optionInputs) {
    optionInput.addEventListener('change', async (e) => {
      if (e.target.checked) {
        if (optionInput.type === 'radio') {
          this.changeBlank(this.size, e.target.value);
          this.size = e.target.value;
          this.resizeToppings();
        } else {
          this.toppings.push(e.target.value);
          this.renderTopping(e.target.value);
          await pause(100)
          giveClassForDuration(document.getElementById(`preview-pizza-${this.id}`), 'dipping', 200);
        }
      } else {
        if (this.toppings.indexOf(e.target.value) !== -1) {
          this.toppings.splice(this.toppings.indexOf(e.target.value), 1);
          this.renderTopping(e.target.value, true);
          giveClassForDuration(document.getElementById(`preview-pizza-${this.id}`), 'jumping', 200);
        }
      }
      document.querySelector('#total-price-display > span').innerText = this.getPriceTotal().toFixed(2);
      this.printInvoice();
    });
  }
};

Pizza.prototype.printInvoice = function() {
  let displaySize = this.optionData.sizes[this.size].displayName;
  let crustStyle = this.optionData.crusts[this.crust].displayName;
  let pizzaBasePrice = this.priceData.sizes[this.size] + this.priceData.crusts[this.crust];
  let displayToppings = [];
  this.toppings.forEach((topping) => {
    let toppingType = this.getToppingType(topping);
    displayToppings.push(this.optionData.toppings[toppingType][topping].displayName);
  });
  let invoiceHTML = `
  <div class="invoice">
    <div class="invoice-header invoice-row">
      <h4>${displaySize} ${crustStyle} Pizza</h4>
      <p class="invoice-row-price">$${pizzaBasePrice.toFixed(2)}</p>
    </div>
    <div ${this.toppings.length === 0 ? 'style="display: none" ' : null} class="invoice-title invoice-row sublist">
      <p>Toppings:</p>
      <p class="invoice-row-price">$${this.getTotalToppingPrice().toFixed(2)}</p>
    </div>
    <div class="invoice-list">
      ${displayToppings.sort().join(', ')}
    </div>
    <div class="invoice-title invoice-row total">
      <p>Total:</p>
      <p class="invoice-row-price total">$${this.getPriceTotal().toFixed(2)}</p>
    </div>
  </div>
  `;
  document.getElementById('invoice-area').innerHTML = invoiceHTML;
  document.getElementById('grand-total-display').innerHTML = '$' + this.getPriceTotal().toFixed(2);
};

Pizza.prototype.renderTopping = function(topping, remove) {
  let pizzaImg = document.getElementById(`preview-pizza-${this.id}`);
  let quantity = this.optionData.sizes[this.size].toppingAmount;
  if (!remove) {
    let imagePath = `images/toppings/${topping.toLowerCase()}.png`;
    let pizzaCenter = {
      x: pizzaImg.clientLeft + (pizzaImg.clientWidth / 2),
      y: pizzaImg.clientTop + (pizzaImg.clientHeight / 2),
    };
    let currentAngle = randomInt(1, 359);
    for (let i=0; i < quantity; i++) {
      let currentDistanceLimits = i % 2 === 0 ? { min: 0.01, max: 0.4 } : { min: 0.5, max: 0.9 };
      let toppingElement = document.createElement('div');
      toppingElement.classList.add('topping', topping);
      toppingElement.style.backgroundImage = `url("${imagePath}")`;
      pizzaImg.append(toppingElement);
      let toppingSize = toppingElement.clientWidth;
      let maxRadius = (pizzaImg.clientWidth / 2) - (toppingSize * 0.5);
      let randomPosition = randomPointInCircle(
        pizzaCenter.x, 
        pizzaCenter.y, 
        maxRadius,
        currentAngle,
        currentDistanceLimits
      );
      let randomX =  randomPosition.x - (toppingSize / 2);
      let randomY =  randomPosition.y - (toppingSize / 2);
      toppingElement.style.top = randomY + 'px';
      toppingElement.style.left = randomX + 'px';
      toppingElement.style.opacity = 1;
      toppingElement.style.transform = `scale(1) rotate(${randomInt(0, 180)}deg)`;
      currentAngle += 360 / quantity;
    }
  } else {
    [...document.getElementsByClassName(topping)].forEach(async (toppingElement) => {
      toppingElement.style.zIndex = 1;
      toppingElement.style.opacity = 0;
      toppingElement.style.transform = `scale(1.5)`;
      await pause(200);
      toppingElement.parentElement.removeChild(toppingElement);
    });
  }
};

Pizza.prototype.resizeToppings = function() {
  let newToppingSize = this.optionData.sizes[this.size].toppingSize;
  document.documentElement.style.setProperty('--topping-size', newToppingSize);
  for (const topping in this.toppings) {
    this.renderTopping(this.toppings[topping], true);
    this.renderTopping(this.toppings[topping]);
  };
};

Pizza.prototype.changeBlank = function(oldSize, newSize) {
  document.querySelector(`#preview-area > #preview-pizza-${this.id}`).classList.replace(oldSize, newSize);
}

// Utillity functions

const pause = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomArbitrary = (min, max) => Math.random() * (max - min) + min;
const degreesToRadians = degrees => degrees * (Math.PI/180);
const randomPointInCircle = (centerX, centerY, radius, angle, limits, exactRadius) => {
  angle = degreesToRadians(angle) || Math.random() * 2 * Math.PI;
  let distanceRandomizer = limits ? randomArbitrary(limits.min, limits.max) : Math.random();
  let hypotenuse = exactRadius ? Math.sqrt(1) * radius : Math.sqrt(distanceRandomizer) * radius;
  let adjacent = Math.cos(angle) * hypotenuse;
  let opposite = Math.sin(angle) * hypotenuse;
  return { x: centerX + adjacent, y: centerY + opposite };
};
const giveClassForDuration = (element, className, duration) => {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, duration);
}