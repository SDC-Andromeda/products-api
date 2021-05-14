const db = require('./index.js');

var getStyles = async (id) => {
  var dataObj = {}

  var queryString = `SELECT * FROM styles WHERE productId = ${id}`;
  var data = await db.query(queryString);
  for (var i = 0; i < data.length; i++) {
    let defaultNum = data[i].default_style;
    delete data[i].default_style;
    data[i]['default?'] = defaultNum === 1 ? true : false;
    data[i].photos = await getPhotos(data[i].id);
    data[i].skus = await getSkus(data[i].id);
    dataObj['product_id'] = data[i].productId;
    delete data[i].productId;
    dataObj.results = data;
  }

  return dataObj;
}
var getPhotos = async (id) => {
  var queryString = `SELECT url, thumbnail_url FROM photos WHERE styleId = ${id}`
  var data = await db.query(queryString);
  return data;
}
var getSkus = async (id) => {
  let dataObj = {};

  var queryString = `SELECT * FROM skus WHERE styleId = ${id}`
  var data = await db.query(queryString);
  for (let i = 0; i < data.length; i++) {
    dataObj[data[i].id] = {
      'quantity': data[i].quantity,
      'size': data[i].size
    }
  }
  return dataObj;
}

var getRelated = async (id) => {
  let relatedArr = [];
  var queryString = `SELECT related_product_id FROM related WHERE current_product_id=${id}`;
  var data = await db.query(queryString);
  for (var i = 0; i < data.length; i++) {
    relatedArr.push(data[i]['related_product_id']);
  }
  return relatedArr;
}

module.exports = {
  'getStyles' : getStyles,
  'getRelated' : getRelated
}