export const API_URL = "http://localhost:8080/api/users";

export async function signup(name: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  return response.json();
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
}