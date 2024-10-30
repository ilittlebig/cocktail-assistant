/**
 * Resuable shopping list component with a print button.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { printHTMLContent } from "../utils/print-utils";

import "./shopping-list-ingredient";

@customElement("shopping-list")
export class ShoppingList extends LitElement {
  @property({ type: Array }) shoppingList: string[] = [];

  static styles = css`
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
  `;

  private printShoppingList() {
    const shoppingListHTML = `
      <div>
        <h3>Shopping List</h3>
        <hr />
        <ul>
          ${this.shoppingList.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
      </div>
    `;
    printHTMLContent(shoppingListHTML);
  }

  protected render() {
    return html`
      <div class="shopping-list">
        <h3 class="shopping-list-title">Shopping List</h3>
        <separator-element></separator-element>

        ${this.shoppingList.length ? html`
          <div class="shopping-list-ingredients">
            ${this.shoppingList.map(
              ingredient => html`<shopping-list-ingredient ingredient=${ingredient}></shopping-list-ingredient>`
            )}
          </div>
        ` : html`<p class="empty-message">Your shopping list is empty.</p>`}

        <button-element
          class="print-button"
          label="Print"
          variant="secondary"
          @click=${this.printShoppingList}
        ></button-element>
      </div>
    `;
  }
}
