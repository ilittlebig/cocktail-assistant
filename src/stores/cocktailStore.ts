/**
 * State management store for the cocktails.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-31
 */

import { writable } from "../lib/store";
import type { CocktailsType } from "../types/cocktail-types";

interface CocktailState {
  cocktails?: CocktailsType;
  loading: boolean;
  error?: string;
  shoppingList: Set<string>;
}

export const cocktailStore = writable<CocktailState>({
  cocktails: undefined,
  loading: false,
  error: undefined,
  shoppingList: new Set(),
});
