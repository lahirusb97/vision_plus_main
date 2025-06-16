// Action type definition
type InvoiceItemsAction =
  | { type: "ADD_ITEM"; payload: InvoiceItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_ITEM"; payload: InvoiceItem };

export function normalOrderItemsReducer(
  state: InvoiceItemsState,
  action: InvoiceItemsAction
): InvoiceItemsState {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItem = action.payload;
      // Check if the item already exists in the list
      const existingItemIndex = state.items.findIndex(
        (item) => item.other_item === newItem.other_item
      );

      // If the item exists, update its quantity (but don't add)
      if (existingItemIndex !== -1) {
        const updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            // Only update the price and subtotal, don't add to quantity
            const updatedPrice = newItem.price_per_unit;
            const updatedSubtotal = item.quantity * updatedPrice;

            return {
              ...item,
              price_per_unit: updatedPrice,
              subtotal: updatedSubtotal,
            };
          }
          return item;
        });

        const updatedTotal = updatedItems.reduce(
          (total, item) => total + item.subtotal,
          0
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedTotal,
        };
      } else {
        // If the item doesn't exist, add it to the list
        const updatedItems = [...state.items, newItem];

        const updatedTotal = updatedItems.reduce(
          (total, item) => total + item.subtotal,
          0
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedTotal,
        };
      }
    }
    case "UPDATE_ITEM": {
      const updatedItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.other_item === updatedItem.other_item
      );

      if (existingItemIndex === -1) {
        return state; // Item not found, return current state
      }

      const updatedItems = state.items.map((item, index) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            ...updatedItem,
          };
        }
        return item;
      });

      const updatedTotal = updatedItems.reduce(
        (total, item) => total + item.subtotal,
        0
      );
      return {
        ...state,
        items: updatedItems,
        total: updatedTotal,
      };
    }
    case "REMOVE_ITEM": {
      const itemId = action.payload; // The id of the item to remove
      const updatedItems = state.items.filter(
        (item) => item.other_item !== itemId
      );

      const updatedTotal = updatedItems.reduce(
        (total, item) => total + item.subtotal,
        0
      );

      return {
        ...state,
        items: updatedItems,
        total: updatedTotal,
      };
    }
    default:
      return state;
  }
}

export type InvoiceItemsState = {
  items: InvoiceItem[];
  total: number;
};

interface InvoiceItem {
  other_item: number;
  name: string;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
}
