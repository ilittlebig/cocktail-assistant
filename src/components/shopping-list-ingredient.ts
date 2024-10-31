/**
 * Resuable component for the shopping list ingredient.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-30
 */

import { html } from "lit-html";
import { component } from "haunted";
import { useCocktail } from "../hooks/useCocktail";

interface ShoppingListIngredientProps {
  ingredient: string;
}

const ShoppingListIngredient = ({ ingredient }: ShoppingListIngredientProps) => {
  const { removeIngredientFromShoppingList } = useCocktail();
  const handleClick = () => removeIngredientFromShoppingList(ingredient);

  return html`
    <style>
      .shopping-list-ingredient {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .ingredient-label {
        color: var(--text-color);
        margin: 0;
      }
    </style>

    <div class="shopping-list-ingredient">
      <p class="ingredient-label">${ingredient}</p>
      <button @click=${handleClick}>x</button>
    </div>
  `;
}

customElements.define("shopping-list-ingredient", component(ShoppingListIngredient));
