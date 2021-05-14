const express = require('express');
const bodyParser = require('body-parser');
const db = require('../DB/index.js')
const helpers = require('../DB/helpers.js');
const app = express();
const PORT = '3000';

// api routes
app.get('/', (req,res) => {
  console.log('root end point');
  res.send('received');
});

// all products
app.get('/products', (req,res) => {
  let page = req.query.page ? req.query.page : 1;
  let count = req.query.count ? req.query.count: 5;
  page = (page * count) - count;
  db.query(`select * from products where id >= ${page} LIMIT ${count}`)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log(err);
    res.end();
  })
})

// product by productId
app.get('/products/:product_id', (req,res) => {
  const productId = req.params.product_id;
  db.query(`SELECT products.*,
  JSON_ARRAYAGG(JSON_OBJECT("feature",features.feature,"value",features.value))
  AS "features" FROM products JOIN features ON features.productId=products.id WHERE products.id=${productId} GROUP BY products.id`)
  .then((data) => {
    res.send(data);
  })
  .catch( err => {
    console.log(err);
    res.end();
  })
})

// product styles
app.get('/products/:product_id/styles', (req, res) => {
  const product_id = req.params.product_id;
  helpers.getStyles(product_id)
  .then((response) => {
    res.send(response);
    res.status(200);
  })
  .catch( err => {
    console.log(err);
    res.end();
  })
})

app.get('/products/:product_id/related', (req, res) => {
  const product_id = req.params.product_id;
  helpers.getRelated(product_id)
  .then((data) => {
    res.send(data)
  })
  .catch( err => {
    console.log(err);
    res.end();
  })
})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// db.query(`SELECT styles.productId,
// //   JSON_ARRAYAGG(JSON_OBJECT("style_id", styles.id,"name", styles.name, "original_price", styles.original_price, "sale_price", styles.sale_price, "default?", styles.default_style, "photos", ))

// //   AS "results" FROM styles WHERE styles.productId=${product_id}`,
//   function (error, results) {
//     if (error) {
//       console.log('err in styles endpoint', error);
//     } else {
//       console.log(results);
//       res.send(results);
//     }
//   }
//  )