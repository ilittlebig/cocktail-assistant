/**
 * Renders a list of cocktails, or a message if there are no results or an error.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { html } from "lit-html";
import { component } from "haunted";
import { useCocktail } from "../hooks/useCocktail";
import type { Cocktail } from "../types/cocktail-types";

import "./cocktail-card";

const CustomMessage = (message: string) => {
  return html`
    <style>
      .message {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-color);
        margin: 0;
        font-style: italic;
        background-color: var(--card-background-color);
        width: 100%;
        height: 100%;
        border-radius: var(--border-radius);
        border: 1px;
        border-style: solid;
        border-color: var(--border-color);
      }
    </style>
    <p class="message">${message}</p>
  `;
}

const CocktailList = () => {
  const { cocktails, error } = useCocktail();

  if (error) return CustomMessage(error);
  if (!cocktails) return CustomMessage("Start by searching for a cocktail above!");
  if (cocktails.length === 0) return CustomMessage("No results found for your search.");

  return html`
    <style>
      .cocktails-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    </style>

    <div class="cocktails-container">
      ${cocktails.map((cocktail: Cocktail) => html`
        <cocktail-card .cocktail=${cocktail}></cocktail-card>`
      )}
    </div>
  `;
}

customElements.define("cocktail-list", component(CocktailList));
