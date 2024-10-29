/**
 * Resuable search bar component with query button.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

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
  @state() private query: string = "";

  private handleInput(e: Event) {
    this.query = (e.target as HTMLInputElement).value;
  }

  private handleSubmit(e: Event) {
    if (!this.query) return;
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("search", { detail: this.query }));
  }

  protected render() {
    return html`
      <form class="search-container" @submit=${this.handleSubmit}>
        <input
          class="search-bar"
          placeholder=${this.placeholder}
          @input=${this.handleInput}
        />
        <button-element
          label="Search"
          variant="primary"
          @click=${this.handleSubmit}
        ></button-element>
      </form>
    `;
  }
}
