/**
 * Resuable component for the shopping list ingredient.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-30
 */

import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("shopping-list-ingredient")
export class ShoppingListIngredient extends LitElement {
  @property({ type: String }) ingredient: string = "";

  static styles = css`
    .shopping-list-ingredient {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .a {
      color: var(--text-color);
      margin: 0;
    }
  `;

  private handleClick() {
    this.dispatchEvent(new CustomEvent("removeFromShoppingList", {
      detail: this.ingredient,
      composed: true,
      bubbles: true,
    }));
  }

  protected render() {
    return html`
      <div class="shopping-list-ingredient">
        <p class="a">${this.ingredient}</p>
        <button class="ab" @click=${this.handleClick}>x</button>
      </div>
    `;
  }
}
