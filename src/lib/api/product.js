import { apiFetch } from "./client";

// Get all products
export function getProducts(query = "") {
  return apiFetch(`products${query}`);
}

// Get single product
export function getProduct(slug) {
  return apiFetch(`products/slug/${slug}`);
}
 
// Create product (Vendor)
export function createProduct(data, token) {
  return apiFetch("products", {
    method: "POST",
    body: data,
    token,
  });
}

export function updateProduct(data,token){
    return apiFetch("products",{
        method:"PATCH",
        body:data,
        token
    })
}

export function deleteProduct(id,token){
    return apiFetch(`prducts/${id}`,token);
}