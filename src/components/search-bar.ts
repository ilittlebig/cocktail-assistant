/**
 * Resuable search bar component with query button.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { html } from "lit-html";
import { component, useState } from "haunted";
import { useCocktail } from "../hooks/useCocktail";

import "./button-element";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar = ({ placeholder = "Search..." }: SearchBarProps) => {
  const { fetchCocktails } = useCocktail();
  const [query, setQuery] = useState<string>("");

  const handleInput = (e: Event) => {
    const newQuery = (e.target as HTMLInputElement).value;
    setQuery(newQuery);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    if (!query) return;
    fetchCocktails(query);
  }

  return html`
    <style>
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
    </style>

    <form class="search-container" @submit=${handleSubmit}>
      <input
        class="search-bar"
        placeholder=${placeholder}
        @input=${handleInput}
      />
      <button-element .label=${"Search"} @click=${handleSubmit}></button-element>
    </form>
  `;
}

customElements.define("search-bar", component(SearchBar));
