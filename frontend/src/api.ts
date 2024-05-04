export function api(url: string, options: RequestInit = {}) {
  return fetch(`http://localhost:3333${url}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });
}

export function apiUpload(url: string, options: RequestInit = {}) {
  return fetch(`http://localhost:3333${url}`, {
    ...options
  });
}
