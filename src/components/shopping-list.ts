/**
 * Resuable shopping list component with a print button.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

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
    .shopping-list-ingredient {
      color: var(--text-color);
      margin: 0;
    }
  `;

  protected render() {
    return html`
      <div class="shopping-list">
        <h3 class="shopping-list-title">Shopping List</h3>
        <separator-element></separator-element>
        <div class="shopping-list-ingredients">
          ${this.shoppingList.map(ingredient =>
            html`<p class="shopping-list-ingredient">${ingredient}</p>`
          )}
        </div>
        <button-element label="Print" variant="secondary"></button-element>
      </div>
    `;
  }
}
