
import { apiFetch } from "./client";
 
export function applyForVendor({ shopName, description, logo }, token) {
  return apiFetch("vendor/apply", {
    method: "POST",
    body: { shopName, description, logo },
    token,
  });
}
 


//Product related operation 

export function getVendorDashboard(token) {
  return apiFetch("vendor/dashboard", { token });
}
 
// GUESSED routes — "vendor/products". Confirm against your actual
// products controller/routes and adjust if different.

export function getVendorProducts(token) {
  return apiFetch("vendor/products", { token });
}
 
export function createVendorProduct(data, token) {
  return apiFetch("products", {
    method: "POST",
    body: data,
    token,
  });
}
 
export function deleteVendorProduct(productId, token) {
  return apiFetch(`products/${productId}`, {
    method: "DELETE",
    token,
  });
}
