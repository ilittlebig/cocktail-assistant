/**
 * Resuable cocktail item component with an add to shopping list button.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { html } from "lit-html";
import { component } from "haunted";
import { useCocktail } from "../hooks/useCocktail";
import type { Cocktail } from "../types/cocktail-types";

import "./button-element";

interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  const { addIngredientsToShoppingList } = useCocktail();
  const { strDrink, strDrinkThumb, strInstructions } = cocktail;

  const instructions = strInstructions
    ? strInstructions.split(".").map(step => step.trim()).filter(Boolean)
    : [];

  const handleAddToShoppingList = () => {
    const ingredients: string[] = [];
    for (let i = 0; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}` as keyof typeof cocktail];
      if (ingredient) ingredients.push(ingredient);
    }
    addIngredientsToShoppingList(ingredients);
  }

  return html`
    <style>
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
    </style>

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
          .label=${"+"}
          .variant=${"primary"}
          @click=${handleAddToShoppingList}
        ></button-element>
      </div>
    </div>
  `;
}

customElements.define("cocktail-card", component(CocktailCard));
