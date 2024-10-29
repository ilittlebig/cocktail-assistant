/**
 * Renders a list of cocktails, or a message if there are no results or an error.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Cocktail, CocktailsType } from "../types/cocktail-types";

import "./cocktail-card";

@customElement("cocktail-list")
export class CockTailList extends LitElement {
  static styles = css`
    .cocktails-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
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
  `;

  @property({ type: Array }) cocktails: CocktailsType[] | undefined = undefined;
  @property({ type: String }) error: string | null = null;

  protected render() {
    if (this.error) {
      return html`<p class="message">${this.error}</p>`;
    }

    if (!this.cocktails) {
      return html`<p class="message">Start by searching for a cocktail above!</p>`;
    }

    if (this.cocktails.length === 0) {
      return html`<p class="message">No results found for your search.</p>`;
    }

    return html`
      <div class="cocktails-container">
        ${this.cocktails.map((cocktail: Cocktail) => html`
          <cocktail-card
            .cocktail=${cocktail}
          ></cocktail-card>`
        )}
      </div>
    `;
  }
}
