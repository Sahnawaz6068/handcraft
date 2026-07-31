
import { apiFetch } from "./client";
 
export function getCart(token) {
  return apiFetch(`cart`, { token });
}
 

export function addCartItem(productId, quantity = 1, token) {
  return apiFetch(`cart/items`, {
    method: "POST",
    body: { productId, quantity },
    token,
  });
}
 
export function updateCartItem(productId, quantity, token) {
  return apiFetch(`cart/items/${productId}`, {
    method: "PATCH",
    body: { quantity },
    token,
  });
}
 
export function removeCartItem(productId, token) {
  return apiFetch(`cart/items/${productId}`, {
    method: "DELETE",
    token,
  });
}
 
export function clearCart(token) {
  return apiFetch(`cart`, {
    method: "DELETE",
    token,
  });
}