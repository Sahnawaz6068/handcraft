
import { apiFetch } from "./client";
 
export function applyForVendor({ shopName, description, logo }, token) {
  return apiFetch("vendor/apply", {
    method: "POST",
    body: { shopName, description, logo },
    token,
  });
}
 

