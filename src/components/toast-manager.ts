/**
 * Manages toasts visible to the user.
 *
 * Author: Elias Sjödin
 * Created: 2024-10-29
 */

import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { Toast } from "../types/toast-manager-types";

@customElement("toast-manager")
export class ToastManager extends LitElement {
  @state() private toasts: Toast[] = [];

  static styles = css`
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
  `;

  showToast(message: string, timeout: number = 3000) {
    const id = Date.now();
    this.toasts = [...this.toasts, { id, message, timeout, isLeaving: false }];
    setTimeout(() => this.startToastRemoval(id), timeout);
  }

  private startToastRemoval(id: number) {
    this.toasts = this.toasts.map(toast =>
      toast.id === id ? { ...toast, isLeaving: true } : toast
    );
    setTimeout(() => this.removeToast(id), 300);
  }

  private removeToast(id: number) {
    this.toasts = this.toasts.filter((toast: Toast) => toast.id !== id);
  }

  protected render() {
    return html`
      <div class="toast-container">
        ${this.toasts.map(
          toast => html`
            <div class="toast ${toast.isLeaving ? 'leaving' : ''}">
              ${toast.message}
            </div>
          `
        )}
      </div>
    `;
  }
}
