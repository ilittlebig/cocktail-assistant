/**
 * This file is the entry point for the application.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-root")
export class AppRoot extends LitElement {
  static styles = css`
    .app-container {
      padding: 10px;
      text-align: center;
      background-color: #f3f3f3;
    }
  `;

  protected render() {
    return html`
      <div class="app-container">
        <h1>Cocktail Assistant</h1>
      </div>
    `;
  }
}
