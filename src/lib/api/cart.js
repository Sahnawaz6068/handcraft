import { apiFetch } from "./client";

// Get all carts
export function getCart(query = "") {
  return apiFetch(`products${query}`);
}