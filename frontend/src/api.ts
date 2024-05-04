export function api(url: string, options: RequestInit = {}) {
  return fetch(`https://project-node-typescript-backend.vercel.app${url}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });
}

export function apiUpload(url: string, options: RequestInit = {}) {
  return fetch(`https://project-node-typescript-backend.vercel.app${url}`, {
    ...options
  });
}
