import { rest } from "msw";

export const handlers = [
  rest.get(
    "https://node-cart-backend.onrender.com/products",
    (req, res, ctx) => {
      return res(
        ctx.json({
          products: [
            {
              id: 1,
              catId: "100",
              title: "Foldsack No. 1 Back",
              price: 109.95,
              description:
                "Your perfect pack for everyday use and walks in the forest.",
              category: "Men's clothing",
              image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
              rating: {
                rate: 4.1,
                count: 120,
              },
            },
            {
              id: 1,
              catId: "100",
              title: "Foldsack No. 1 Back",
              price: 109.95,
              description:
                "Your perfect pack for everyday use and walks in the forest.",
              category: "Men's clothing",
              image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
              rating: {
                rate: 4.1,
                count: 120,
              },
            },
            {
              id: 1,
              catId: "100",
              title: "Foldsack No. 1 Back",
              price: 109.95,
              description:
                "Your perfect pack for everyday use and walks in the forest.",
              category: "Men's clothing",
              image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
              rating: {
                rate: 4.1,
                count: 120,
              },
            },
          ],
        }),
        ctx.delay(150)
      );
    }
  ),
  rest.get(
    "https://node-cart-backend.onrender.com/category",
    (req, res, ctx) => {
      return res(
        ctx.json({
          category: [
            {
              name: "Men's clothing",
              catId: "100",
            },
            {
              name: "Women's clothing",
              catId: "101",
            },
            {
              name: "Electronics",
              catId: "102",
            },
            {
              name: "Jewellery",
              catId: "103",
            },
          ],
        }),
        ctx.delay(150)
      );
    }
  ),
  rest.post("https://node-cart-backend.onrender.com/login", (req, res, ctx) => {
    return res(
      ctx.json({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFycGl0dHR0dEBnbWFpbC5jb20iLCJpYXQiOjE2ODE2Mzg0MDcsImV4cCI6MTY4MTY0MjAwN30.1p84wcszEZxzFoUAitDX1IyGCATfufnkKHEkJxV2bd8",
        id: "7ae12488-3452-4347-8042-014c771483b0",
        email: "arpittttt@gmail.com",
        name: "arpit ktyr",
      }),
      ctx.delay(150)
    );
  }),

  rest.post(
    "https://node-cart-backend.onrender.com/signup",
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: "User created.",
          user: {
            id: "d6325060-22e3-40a6-90e6-27d97991cd5e",
            email: "arpitkatiyar@gmail.com",
            name: "arpit ktyr",
          },
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFycGl0dHR0dHR0QGdtYWlsLmNvbSIsImlhdCI6MTY4MjQ4MDMyNSwiZXhwIjoxNjgyNDgzOTI1fQ.tPh15-pAr0WRzy8dLb3RREMIcGIeSmGQ8ydmLjRlb0w",
        }),
        ctx.delay(150)
      );
    }
  ),
];
