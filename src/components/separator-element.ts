/**
 * Reusable horizontally separator to split elements.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("separator-element")
export class SeparatorElement extends LitElement {
  static styles = css`
    .separator {
      background-color: var(--border-color);
      margin: 0;
    }
  `;

  protected render() {
    return html`
      <hr class="separator"></hr>
    `;
  }
}
