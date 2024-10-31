/**
 * Manages toasts visible to the user.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { html } from "lit-html";
import { component, useState, useEffect } from "haunted";

interface Toast {
  id: number;
  message: string;
  timeout: number;
  isLeaving: boolean;
}

interface ToastManagerInstance {
  showToast: (message: string, timeout: number) => void | undefined;
}

// Singleton needed to expose showToast
let toastManagerInstance: ToastManagerInstance | null = null;

const ToastManager = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, timeout: number) => {
    const id = Date.now();
    setToasts((currentToasts = []) => [
      ...currentToasts,
      { id, message, timeout, isLeaving: false }
    ]);
    setTimeout(() => startToastRemoval(id), timeout);
  }

  const startToastRemoval = (id: number) => {
    setToasts((currentToasts = []) => currentToasts.map(toast =>
      toast.id === id ? { ...toast, isLeaving: true } : toast
    ));
    setTimeout(() => removeToast(id), 300);
  }

  const removeToast = (id: number) => {
    setToasts((currentToasts = []) => currentToasts.filter((toast: Toast) =>
      toast.id !== id)
    );
  }

  useEffect(() => {
    toastManagerInstance = { showToast };
    return () => toastManagerInstance = null;
  }, []);

  return html`
    <style>
      .toast-container {
        position: fixed;
        bottom: 16px;
        right: 16px;
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 8px;
        z-index: 1000;
        width: 400px;
      }
      .toast {
        padding: 12px 16px;
        background-color: var(--card-background-color);
        color: var(--text-color);
        border-radius: var(--border-radius);
        border-width: 1px;
        border-style: solid;
        border-color: var(--border-color);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        opacity: 0.9;
        transition: transform 0.3s ease, opacity 0.3s ease;
        width: fit-content;
      }
      .toast.leaving {
        animation: fadeOutDown 0.3s forwards;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 0.9;
          transform: translateY(0);
        }
      }
      @keyframes fadeOutDown {
        from {
          opacity: 0.9;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(20px);
        }
      }
    </style>

    <div class="toast-container">
      ${toasts.map(
        toast => html`
          <div class="toast ${toast.isLeaving ? 'leaving' : ''}">
            ${toast.message}
          </div>
        `
      )}
    </div>
  `;
}

/**
 * Expose the showToast method to other components.
 */

export const showToast = (message: string, timeout: number = 3000) => {
  if (toastManagerInstance) {
      toastManagerInstance.showToast(message, timeout);
    } else {
      console.warn("ToastManager instance is not available.");
    }
}

customElements.define("toast-manager", component(ToastManager));
