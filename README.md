# About Project

This is a shopping cart application, where you can see many different product and you can add them into cart. Login and register functionality is available.I'm using react-redux for managing store data.also I'm using thunk middleware. \
 https://react-shopping-cart-c1803.web.app/ - Live link for Project. \
When you open this link you will be land on homepage, You can see categories and some top rated items on home page you can view any categories , products and simply add them into your cart.

## steps to start dev server

### `npm start`

you have to run this command for starting dev server

## steps to create production build

### `npm build`

you have to run this command for creating build for production.

## APIs used

### In this project i'm using these API-

https://node-cart-backend.onrender.com/category - For Fetching All the Categories.\
https://node-cart-backend.onrender.com/products - For Fetching All the Products. \
https://node-cart-backend.onrender.com/login - For Customer login. \
https://node-cart-backend.onrender.com/signup - For Customer Signup.

## Some HighLights

#### These are few Point I want to highlight

I'm triggring a API Calls at the time of loading using thunk middleware.and storing data into store.
Then on every page I'm using the same data for for particular categories and product. Means i'm not triggring any other call when you visit any cateory or product.
