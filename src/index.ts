/**
 * Entry point for the application.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

import "./components/search-bar";
import "./components/cocktail-card";
import "./components/button-element";

@customElement("app-root")
export class AppRoot extends LitElement {
  static styles = css`
    .app-title {
      color: var(--text-color);
      text-align: center;
      margin: 0;
    }
    .app-container {
      display: flex;
      flex-direction: column;
      gap: 32px;
      margin: 0 auto;
      padding: 64px;
      max-width: 900px;
    }

    .cocktails-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .shopping-list-container {
    }

    search-bar {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      display: block;
    }
  `;

  protected render() {
    return html`
      <div class="app-container">
        <h1 class="app-title">Cocktail Assistant</h1>
        <search-bar placeholder="Search for a cocktail..."></search-bar>
        <div>
          <div class="cocktails-container">
            <cocktail-card imageSrc="https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg"></cocktail-card>
          </div>
          <div class="shopping-list-container">
          </div>
        </div>
      </div>
    `;
  }
}
