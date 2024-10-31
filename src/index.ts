/**
 * Entry point for the application.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { html } from "lit-html";
import { component } from "haunted";

import "./components/search-bar";
import "./components/cocktail-list";
import "./components/shopping-list";
import "./components/toast-manager";

const AppRoot = () => {
  return html`
    <style>
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
      }
    </style>

    <div class="app-container">
      <h1 class="app-title">Cocktail Assistant</h1>
      <search-bar .placeholder=${"Search for a cocktail..."}></search-bar>
      <div class="content-container">
        <cocktail-list></cocktail-list>
        <shopping-list></shopping-list>
      </div>
      <toast-manager></toast-manager>
    </div>
  `;
}

customElements.define("app-root", component(AppRoot));
