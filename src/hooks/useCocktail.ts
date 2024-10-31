/**
 * Manages state for the cocktail app.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-31
 */

import { useEffect, useState } from "haunted";
import { cocktailStore } from "../stores/cocktailStore";
import { showToast } from "../components/toast-manager";

export const useCocktail = () => {
  const [state, setState] = useState(cocktailStore.get());

  const fetchCocktails = async (query: string) => {
    cocktailStore.set({ loading: true });
    cocktailStore.set({ error: undefined });

    try {
     showToast("Searching for cocktails...");

      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      const cocktails = data.drinks || [];

      const isEmpty = cocktails?.length === 0;
      if (isEmpty) showToast("No results found.");
      if (!isEmpty) showToast("Here are your results.");

      cocktailStore.set({ cocktails });
    } catch (err: any) {
      cocktailStore.set({ error: "An error occurred while fetching cocktails." });
      showToast("An error occurred while fetching cocktails.");
    } finally {
      cocktailStore.set({ loading: false });
    }
  };

  const addIngredientsToShoppingList = (ingredients: string[]) => {
    const shoppingList = new Set(cocktailStore.get().shoppingList);
    for (const ingredient of ingredients) {
      shoppingList.add(ingredient);
    }

    cocktailStore.set({ shoppingList });
    showToast("Ingredients added to shopping list.");
  };

  const removeIngredientFromShoppingList = (ingredient: string) => {
    const shoppingList = new Set(cocktailStore.get().shoppingList);
    shoppingList.delete(ingredient);
    cocktailStore.set({ shoppingList });
    showToast("Ingredient removed from shopping list.");
  };

  useEffect(() => {
    const unsubscribe = cocktailStore.subscribe(setState)
    return unsubscribe;
  }, []);

  return {
    ...state,
    fetchCocktails,
    addIngredientsToShoppingList,
    removeIngredientFromShoppingList,
  };
}
