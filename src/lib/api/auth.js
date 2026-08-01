import { apiFetch } from "./client";

export function signUp(data) {
  return apiFetch("user/signUp", {
    method: "POST",
    body: data,
  });
}

export function signIn(data) {
  return apiFetch("user/signin", {
    method: "POST",
    body: data,
  });
}

export function resendOtp({ email }) {
  return apiFetch("otp/send", { method: "POST", body: { email } });
}

export function verifyOtp({ email, otp }) {
  return apiFetch("otp/verify", { method: "POST", body: { email, otp } });
}


export function getProfile (userId,token){
  return apiFetch(`user/${userId}`,{token})
}
