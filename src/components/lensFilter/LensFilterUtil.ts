export type LensFilterAction =
  | {
      type: "updateleft";
      payload: Partial<LensFilterReducerState["leftLens"]>;
    }
  | {
      type: "updateright";
      payload: Partial<LensFilterReducerState["rightLens"]>;
    }
  | {
      type: "update_type";
      payload: number | null;
    }
  | {
      type: "update_coating";
      payload: number | null;
    }
  | {
      type: "update_brand";
      payload: number | null;
    }
  | {
      type: "update_left_price";
      payload: string;
    }
  | {
      type: "update_right_price";
      payload: string;
    }
  | {
      type: "reset_left_price";
    }
  | {
      type: "reset_right_price";
    }
  | {
      type: "update_left_qty";
      payload: string;
    }
  | {
      type: "update_right_qty";
      payload: string;
    }
  | {
      type: "reset_left_qty";
    }
  | {
      type: "reset_right_qty";
    };
export interface LensFilterReducerState {
  leftLens: {
    left_sph: string | null;
    left_cyl: string | null;
    left_add: string | null;
    left_price: string | null;
  };
  rightLens: {
    right_sph: string | null;
    right_cyl: string | null;
    right_add: string | null;
    right_price: string | null;
  };
  lens_type: number | null;
  coating: number | null;
  brand: number | null;
  leftQty: string;
  rightQty: string;
}

export const lensefilterReducer = (
  state: LensFilterReducerState,
  action: LensFilterAction
) => {
  switch (action.type) {
    case "updateleft":
      return { ...state, leftLens: { ...state.leftLens, ...action.payload } };
    case "updateright":
      return { ...state, rightLens: { ...state.rightLens, ...action.payload } };
    case "update_type":
      return { ...state, lens_type: action.payload };
    case "update_coating":
      return { ...state, coating: action.payload };
    case "update_brand":
      return { ...state, brand: action.payload };
    case "update_left_price":
      return {
        ...state,
        leftLens: { ...state.leftLens, left_price: action.payload },
      };
    case "update_right_price":
      return {
        ...state,
        rightLens: { ...state.rightLens, right_price: action.payload },
      };
    case "update_left_qty":
      return { ...state, leftQty: action.payload };
    case "update_right_qty":
      return { ...state, rightQty: action.payload };
    case "reset_left_price":
      return { ...state, leftLens: { ...state.leftLens, left_price: null } };
    case "reset_right_price":
      return { ...state, rightLens: { ...state.rightLens, right_price: null } };
    case "reset_left_qty":
      return { ...state, leftQty: "N/A" };
    case "reset_right_qty":
      return { ...state, rightQty: "N/A" };
    default:
      return state;
  }
};
export const lensFilterinitialState = {
  leftLens: {
    left_sph: null,
    left_cyl: null,
    left_add: null,
    left_price: null,
  },
  rightLens: {
    right_sph: null,
    right_cyl: null,
    right_add: null,
    right_price: null,
  },
  lens_type: null,
  coating: null,
  brand: null,
  leftQty: "N/A",
  rightQty: "N/A",
};
