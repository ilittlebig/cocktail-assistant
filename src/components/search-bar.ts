/**
 * Resuable search bar component with query button.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("search-bar")
export class SearchBar extends LitElement {
  static styles = css`
    .search-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
    }
    .search-bar {
      padding: 10px;
      text-align: left;
      background-color: var(--card-background-color);
      border-radius: var(--border-radius);
      border-width: 1px;
      border-style: solid;
      border-color: var(--border-color);
      width: 100%;
    }
  `;

  @property({ type: String }) placeholder: string = "Search...";

  protected render() {
    return html`
      <div class="search-container">
        <input class="search-bar" .placeholder=${this.placeholder} />
        <button-element label="Search" variant="primary"></button-element>
      </div>
    `;
  }
}
