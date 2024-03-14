import React, { useState } from 'react';
import { useImmer } from 'use-immer';

function ShoppingListWithImmer() {
  const [shoppingList, updateShoppingList] = useImmer([
    { id: 1, name: 'Milk', quantity: 2, details: { category: 'Dairy', notes: 'Get almond milk' } },
  ]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, details: { category: '', notes: '' } });

  function addItem(event) {
    event.preventDefault(); // Prevent form submission from reloading the page
    updateShoppingList(draft => {
      draft.push({
        ...newItem,
        id: Date.now() // Simple ID generation for example purposes
      });
    });
    setNewItem({ name: '', quantity: 1, details: { category: '', notes: '' } }); // Reset form
  }

  function updateItem(id, newItemAttributes) {
    updateShoppingList(draft => {
      const item = draft.find(item => item.id === id);
      if (item) {
        Object.assign(item, newItemAttributes);
      }
    });
  }

  function removeItem(id) {
    updateShoppingList(draft => {
      const index = draft.findIndex(item => item.id === id);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
  }

  return (
    <div>
      <ul>
        {shoppingList.map(item => (
          <li key={item.id}>
            {item.name}, Quantity: {item.quantity}
            {/* Buttons for updating and removing items */}
            <button onClick={() => updateItem(item.id, { quantity: item.quantity + 1 })}>Increase Quantity</button>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {/* Form for adding items */}
      <form onSubmit={addItem}>
        <input
          type="text"
          placeholder="Item name"
          value={newItem.name}
          onChange={e => setNewItem(current => ({ ...current, name: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={e => setNewItem(current => ({ ...current, quantity: Number(e.target.value) }))}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default ShoppingListWithImmer;
