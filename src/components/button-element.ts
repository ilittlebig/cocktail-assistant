/**
 * Generic button component.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { html } from "lit-html";
import { component } from "haunted";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
}

const ButtonElement = ({ label, variant = "primary" }: ButtonProps) => {
  return html`
    <style>
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
    </style>

    <button class="button button--${variant}">
      ${label}
    </button>
  `;
}

customElements.define("button-element", component(ButtonElement));
