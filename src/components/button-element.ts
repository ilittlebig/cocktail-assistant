/**
 * Generic button component.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("button-element")
export class ButtonElement extends LitElement {
  static styles = css`
    .button {
      padding: 10px 16px;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .button:hover {
      filter: brightness(0.9);
    }
    .button--primary {
      background-color: var(--primary-color);
      color: white;
      transition: filter 0.3s;
    }
    .button--secondary {
      background-color: var(--secondary-color);
      color: white;
      transition: filter 0.3s;
    }
  `;

  @property({ type: String }) label: string = "";
  @property({ type: String }) variant: "primary" | "secondary" = "primary";

  private handleClick() {
    this.dispatchEvent(new Event("click"));
  }

  protected render() {
    return html`
      <button
        class="button button--${this.variant}"
        @click=${this.handleClick}
      >
        ${this.label}
      </button>
    `;
  }
}
