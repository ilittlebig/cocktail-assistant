/**
 * Resuable shopping list component with a print button.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { html } from "lit-html";
import { component } from "haunted";
import { useCocktail } from "../hooks/useCocktail";
import { printHTMLContent } from "../utils/print-utils";

import "./shopping-list-ingredient";
import "./button-element";
import "./separator-element";

const ShoppingList = () => {
  const { shoppingList } = useCocktail();
  const shoppingListArray = Array.from(shoppingList);

  const printShoppingList = () => printHTMLContent(`
    <div>
      <h3>Shopping List</h3>
      <hr />
      <ul>
        ${shoppingListArray.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>
    </div>
  `);

  return html`
    <style>
      .shopping-list {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 32px;
        background-color: var(--card-background-color);
        border-radius: var(--border-radius);
        border-width: 1px;
        border-style: solid;
        border-color: var(--border-color);
        width: 250px;
      }
      .shopping-list-title {
        color: var(--text-color);
        margin: 0;
      }
      .shopping-list-ingredients {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .empty-message {
        color: var(--text-color);
        font-style: italic;
        margin: 0;
        text-align: center;
      }
    </style>

    <div class="shopping-list">
      <h3 class="shopping-list-title">Shopping List</h3>
      <separator-element></separator-element>

      ${shoppingListArray.length > 0 ? html`
        <div class="shopping-list-ingredients">
          ${shoppingListArray.map(ingredient => html`
            <shopping-list-ingredient .ingredient=${ingredient}></shopping-list-ingredient>
          `)}
        </div>
      ` : html`<p class="empty-message">Your shopping list is empty.</p>`}

      <button-element
        class="print-button"
        .label=${"Print"}
        .variant=${"secondary"}
        @click=${printShoppingList}
      ></button-element>
    </div>
  `;
}

customElements.define("shopping-list", component(ShoppingList));
