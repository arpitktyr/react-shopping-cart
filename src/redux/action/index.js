import { ActionType } from "../../Constants/Index";

// To add item
export const addCart = (product) => {
  return {
    type: ActionType.ADD_ITEM,
    payload: product,
  };
};

// To delete item
export const delCart = (product) => {
  return {
    type: ActionType.DELETE_ITEM,
    payload: product,
  };
};
// To increase item
export const increaseQty = (product) => {
  return {
    type: ActionType.INCREASE_QTY,
    payload: product,
  };
};
// To decrease item
export const decreaseQty = (product) => {
  return {
    type: ActionType.DECREASE_QTY,
    payload: product,
  };
};

