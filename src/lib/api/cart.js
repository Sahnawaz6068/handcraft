import { apiFetch } from "./client";

// Get all carts
export function getCart() {
  return apiFetch(`cart`);
}

//Search about the the token i will send in each subsequent reqs by storing in heador 
//Or only send to that which requires token ,
//my token is get stored in cookies i shoud store it in the header so with each req it
// go automatically
// or it is not good flow.
//what is the correct flow in Hinglish