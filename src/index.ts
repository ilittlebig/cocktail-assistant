/**
 * Entry point for the application.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { CocktailsType } from "./types/cocktail-types";

import "./components/search-bar";
import "./components/cocktail-list";
import "./components/button-element";
import "./components/shopping-list";
import "./components/separator-element";

const COCKTAILS_ENDPOINT = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

@customElement("app-root")
export class AppRoot extends LitElement {
  @property({ type: Array }) cocktails: CocktailsType[] | undefined  = undefined;
  @property({ type: String }) error: string | null = null;
  @state() private shoppingList: Set<string> = new Set();

  static styles = css`
    .app-container {
      display: flex;
      flex-direction: column;
      gap: 32px;
      margin: 0 auto;
      padding: 64px;
      max-width: 1000px;
    }
    .app-title {
      color: var(--text-color);
      text-align: center;
      margin: 0;
    }

    .content-container {
      flex: 1;
      display: flex;
      gap: 16px;
    }

    search-bar {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      display: block;
    }

    cocktail-list {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  private addIngredientsToShoppingList(e: CustomEvent) {
    const ingredients: string[] = e.detail;
    for (const ingredient of ingredients) {
      this.shoppingList.add(ingredient);
    };
    this.requestUpdate();
  }

  private async fetchCocktails(query: string) {
    this.error = null;
    this.cocktails = [];

    try {
      const response = await fetch(COCKTAILS_ENDPOINT + query);
      const data = await response.json();
      this.cocktails = data.drinks || [];
    } catch (err: any) {
      this.error = err.message;
      this.cocktails = undefined;
    }
  }

  protected render() {
    const handleSearch = async (e: CustomEvent) => {
      const query = e.detail;
      await this.fetchCocktails(query);
    };

    return html`
      <div class="app-container">
        <h1 class="app-title">Cocktail Assistant</h1>
        <search-bar
          placeholder="Search for a cocktail..."
          @search=${handleSearch}
        ></search-bar>
        <div class="content-container">
          <cocktail-list
            .cocktails=${this.cocktails}
            .error=${this.error}
            @addToShoppingList=${this.addIngredientsToShoppingList}
          ></cocktail-list>
          <shopping-list
            .shoppingList=${Array.from(this.shoppingList)}
          ></shopping-list>
        </div>
      </div>
    `;
  }
}
