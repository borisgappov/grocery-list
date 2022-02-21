const groceries = [
  'Apples',
  'Avocados',
  'Baking powder',
  'Baking Soda',
  'Bananas',
  'Basil',
  'Bell Peppers',
  'Berries',
  'Black Beans',
  'Breadcrumbs',
  'Broccoli',
  'Brown Sugar',
  'Butter',
  'Carrots',
  'Chicken',
  'Chicken stock/broth',
  'Chocolate Chips',
  'Cilantro',
  'Cocoa Powder',
  'Cookie Dough',
  'Corn',
  'Diced Tomatoes',
  'Dry Yeast',
  'Eggs',
  'Flour',
  'Flour Tortillas',
  'Garlic',
  'Greek Yogurt',
  'Green Chiles',
  'Ground Beef/Turkey',
  'Honey',
  'Jam/Jelly',
  'Juice Concentrate',
  'Lemons/Limes',
  'Lunch Meat',
  'Milk',
  'Onion',
  'Parsley',
  'Pasta',
  'Pasta Sauce',
  'Peanut Butter',
  'Pie Crust',
  'Pizza :)',
  'Potatoes',
  'Powdered Sugar',
  'Quinoa',
  'Rice',
  'Salsa',
  'Shredded Cheese',
  'Sliced Cheese',
  'Soups',
  'Sour Cream',
  'Spinach',
  'Strawberries',
  'Sugar',
  'Tomatoes',
  'Tuna',
  'Vanilla',
  'Wheat Bread'
];

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomGrocery() {
  return {
    id: Math.floor(Math.random() * 1E10),
    name: getRandomItem(groceries),
    ranOut: Math.random() > 0.7,
    priority: 1 + Math.floor(Math.random() * 5)
  }
}

export const getRandomGroceryList = function (count) {
  let result = {};
  if (count > groceries.length) count = groceries.length;
  while (Object.keys(result).length < count) {
    let item = getRandomGrocery();
    result[item.name] = item;
  }
  return Object.values(result);
}

export const sort = function (array) {
  return array.sort((a, b) => a.priority === b.priority
    ? (a.name === b.name
      ? 0
      : a.name > b.name ? 1 : -1)
    : (a.priority >= b.priority ? 1 : -1));
}

export const newGrocery = () => ({
  id: Math.floor(Math.random() * 1E10),
  name: '',
  ranOut: false,
  priority: 0
});

