import "./App.css";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import ProductList from "./components/Products/ProductList";
import Login, { logoutAction } from "./components/Login/Login";
import Register from "./components/Register/Register";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ProductDetail from "./components/Products/ProductDetail";
import Errorpage from "./components/Errorpage/Errorpage";
import { checkAuthLoader, tokenLoader } from "./Utils/auth";
import Orders from "./components/Orders/Orders";
import Cart from "./components/Cart/Cart";
import RootLayout from "./components/Root/Root";
import Profile from "./components/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Errorpage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      {
        path: "About",
        element: <About />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "Cart",
        element: <Cart />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "products/:catId",
        element: <ProductList />,
      },
      {
        path: "product/:pid",
        element: <ProductDetail />,
      },
      {
        path: "/products/:catId",
        element: <ProductList />,
      },
      {
        path: "/orders",
        element: <Orders />,
        loader: checkAuthLoader,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: checkAuthLoader,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  //this is the old code which i used for routing
  // return (
  //   <div className="App">
  //     <BrowserRouter>
  //       <Header />
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/About" element={<About />} />
  //         <Route path="/Contact" element={<Contact />} />
  //         <Route path="/Cart" element={<Cart />} />
  //         <Route path="/Login" element={<Login />} />
  //         <Route path="/Register" element={<Register />} />
  //         <Route exact path="/products/:catId" element={<ProductList />} />
  //         <Route path="/product/:pid" element={<ProductDetail />} />
  //         <Route path="/Logout" element={<Logout />} />
  //         <Route path="/Cart" element={<Cart />} />
  //         <Route path="/Context" element={<ContextAPIExample />} />
  //         <Route path="/Color" element={<Color />} />
  //         <Route path="/*" element={<Errorpage />} />
  //       </Routes>
  //       <Footer />
  //     </BrowserRouter>
  //   </div>
  // );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
