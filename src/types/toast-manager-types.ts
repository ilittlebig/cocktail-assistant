/**
 * Interface for token manager types.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

export type ShowToast = {
  showToast: (message: string, timeout?: number) => void
}

export interface Toast {
  id: number;
  message: string;
  timeout: number;
}
