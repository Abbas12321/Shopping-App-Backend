const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findById(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });




// const path = require('path');

// const express = require('express');
// const bodyParser = require('body-parser');

// const errorController = require('./controllers/error');
// const db = require('./util/database');

// const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products')
// .then(result => {
//     console.log(result[0], result[1]);
// })
// .catch(err => {
//     console.log(err);
// });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// app.use(errorController.get404);

// app.listen(3000);




// const path = require('path');

// const express = require('express');
// const bodyParser = require('body-parser');
// // const expressHbs = require('express-handlebars');

// const errorController = require('./controllers/error')

// const app = express();

// // app.engine(
// //   'hbs',
// //   expressHbs({
// //     layoutsDir: 'views/layouts/',
// //     defaultLayout: 'main-layout',
// //     extname: 'hbs'
// //   })
// // );
// // app.set('view engine', 'hbs');
// app.set('view engine', 'ejs');
// app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// app.use(errorController.get404);

// app.listen(3000);






// // const http = require('http');
// // const routes = require('./routes');
// const path = require('path');

// const express = require('express');
// const bodyParser = require('body-parser');

// const shopRoutes = require('./routes/shop');
// const adminData = require('./routes/admin');
// const expressHbs = require('express-handlebars');

// const app = express();

// app.engine('hbs', expressHbs());
// app.set('view engine', 'hbs');
// app.set('views', 'views');

// // const app2 = express();

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminData.routes);
// app.use(shopRoutes);

// // app.use('/', (req,res,next) => {
// //     console.log("this is always running");
// //     res.send('<h1>hwl from express!</h1>');
// //     next();                                       // use next func for showing another middleware
// // });

// // app.use('/second',(req,res,next) =>{
// //     console.log("in another middleware");
// //     res.send('<h1>hwl from second page!</h1>');
// // });

// app.use((req,res,next) => {
//     res.status(404).render('404', {pageTitle: 'Page not found'});
// });

// // console.log(routes.someText);

// // const server = http.createServer(app);

// app.listen(3000); 

// // app2.listen(4000);
