import { ActionType } from "../../Constants/Index";

const cart = [];

const handleCart = (state = cart, action) => {
  //console.log(product);
  const product = action.payload;
  // console.log(product);

  switch (action.type) {
    case ActionType.ADD_ITEM:
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        // console.log(exist);
        return state.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty:
                  item.qty > 1
                    ? item.qty + product.qty
                    : parseInt(item.unit) + 1,
              }
            : item
        );
      }

      return [...state, product];

    case ActionType.DELETE_ITEM:
      return state.filter((item) => {
        return item.id !== action.payload;
      });
    case ActionType.INCREASE_QTY:
      return state.map((item) =>
        item.id === product.id ? { ...item, qty: product.qty + 1 } : item
      );

    case ActionType.DECREASE_QTY:
      return state.map((item) =>
        item.id === product.id
          ? { ...item, qty: product.qty > 1 ? product.qty - 1 : product.qty }
          : item
      );

    default:
      return state;
    // break;
  }
};

export default handleCart;
