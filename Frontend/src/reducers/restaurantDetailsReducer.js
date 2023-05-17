import { reduxConstants } from "../constants/reduxConstants";

const initialState = {
  addDishModalShow: false,
};

export function restaurantDetails(state = initialState, action) {
  switch (action.type) {
    case reduxConstants.ADD_DISH_MODAL_SHOW:
      return {
        ...state,
        addDishModalShow: action.value,
      };
    default:
      return state;
  }
}
