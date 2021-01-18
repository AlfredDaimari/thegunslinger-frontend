/*
file that calls the backend for data and converts it into arrays of filters
*/

function createFilters(products) {
  var category = [];
  var colour = [];
  var type = [];

  for (let prod of products) {
    if (!category.includes(prod.category)) {
      category.push(prod.category);
    }

    for (let col of prod.properties.colour) {
      if (!colour.includes(col)) {
        colour.push(col);
      }
    }

    if (!type.includes(prod.properties.type_)) {
      type.push(prod.properties.type_);
    }
  }
  return {
    category,
    colour: colour.sort(),
    type: type.sort(),
  };
}

export default async function getProdsAndFilters(query) {
  var header = new Headers();
  header.append("Content-Type", "application/json");
  var products = await fetch("http://localhost/products?" + query, {
    headers: header,
  });
  products = await products.json();
  var filters = createFilters(products);
  filters.price = [50, 100, 200, 300];
  return { products, filters };
}
