/**
 * Resuable cocktail item component with an add to shopping list button.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Cocktail } from "../types/cocktail-types";

@customElement("cocktail-card")
export class CocktailCard extends LitElement {
  @property({ type: Object }) cocktail: Cocktail = {};

  static styles = css`
    .cocktail-card {
      display: flex;
      justify-content: space-between;
      gap: 32px;
      padding: 32px;
      background-color: var(--card-background-color);
      border-radius: var(--border-radius);
      border-width: 1px;
      border-style: solid;
      border-color: var(--border-color);
    }
    .cocktail-content {
      display: flex;
      gap: 16px;
    }
    .cocktail-thumbnail img {
      width: 150px;
      height: auto;
      border-radius: var(--border-radius);
    }
    .cocktail-details {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .cocktail-instructions {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 0;
      padding: 0 0 0 16px;
    }
    .cocktail-name {
      color: var(--text-color);
      margin: 0;
    }
    .cocktail-instruction {
      color: var(--text-color);
      margin: 0;
    }

    .button-container {
      margin-top: auto;
      display: flex;
      justify-content: flex-end;
    }

    @media (max-width: 1000px) {
      .cocktail-card {
        flex-direction: column;
      }

      .cocktail-content {
        flex-direction: column;
      }

      .cocktail-thumbnail img {
        width: 100px;
      }
    }
  `;

  private getInstructionSteps(instructions?: string): string[] {
    return instructions
      ? instructions.split(".").map(step => step.trim()).filter(Boolean)
      : [];
  }

  private handleAddToShoppingList() {
    const ingredients = [
      this.cocktail.strIngredient1,
      this.cocktail.strIngredient2,
      this.cocktail.strIngredient3,
      this.cocktail.strIngredient4,
      this.cocktail.strIngredient5,
      this.cocktail.strIngredient6,
      this.cocktail.strIngredient7,
      this.cocktail.strIngredient8,
      this.cocktail.strIngredient9,
      this.cocktail.strIngredient10,
      this.cocktail.strIngredient11,
      this.cocktail.strIngredient12,
      this.cocktail.strIngredient13,
      this.cocktail.strIngredient14,
      this.cocktail.strIngredient15,
    ].filter(Boolean);

    this.dispatchEvent(new CustomEvent("addToShoppingList", {
      detail: ingredients,
      composed: true,
      bubbles: true,
    }));
  }

  protected render() {
    const { strDrink, strDrinkThumb, strInstructions } = this.cocktail;
    const instructions = this.getInstructionSteps(strInstructions);

    return html`
      <div class="cocktail-card">
        <div class="cocktail-content">
          <div class="cocktail-thumbnail">
            <img src=${strDrinkThumb} alt="Cocktail image"></img>
          </div>
          <div class="cocktail-details">
            <h3 class="cocktail-name">${strDrink}</h3>
            <ol class="cocktail-instructions">
              ${instructions.map(
                step => html`<li class="cocktail-instruction">${step}</li>`
              )}
            </ol>
          </div>
        </div>
        <div class="button-container">
          <button-element
            label="+"
            variant="primary"
            @click=${this.handleAddToShoppingList}
          ></button-element>
        </div>
      </div>
    `;
  }
}
