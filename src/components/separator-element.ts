/**
 * Reusable horizontally separator to split elements.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { html } from "lit-html";
import { component } from "haunted";

const SeparatorElement = () => {
  return html`
    <style>
      .separator {
        background-color: var(--border-color);
        margin: 0;
      }
    </style>
    <hr class="separator"></hr>
  `;
}

customElements.define("separator-element", component(SeparatorElement));
