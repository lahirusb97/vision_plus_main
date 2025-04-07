// Action type definition
type InvoiceItemsAction =
  | { type: "ADD_ITEM"; payload: InvoiceItem }
  | { type: "REMOVE_ITEM"; payload: number };

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

      // If the item exists, update its quantity and subtotal
      if (existingItemIndex !== -1) {
        const updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            const updatedQuantity = item.quantity + newItem.quantity; // Add quantity
            const updatedPrice = newItem.price_per_unit; // Use the new price if it's provided
            const updatedSubtotal = updatedQuantity * updatedPrice; // Recalculate subtotal

            return {
              ...item,
              quantity: updatedQuantity,
              price_per_unit: updatedPrice, // Update price if it changed
              subtotal: updatedSubtotal,
            };
          }
          return item;
        });

        // Recalculate total
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

        // Recalculate total
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
    case "REMOVE_ITEM": {
      const itemId = action.payload; // The id of the item to remove
      const updatedItems = state.items.filter(
        (item) => item.other_item !== itemId
      );

      // Recalculate total
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
