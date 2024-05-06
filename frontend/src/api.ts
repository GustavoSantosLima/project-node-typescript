export function api(url: string, options: RequestInit = {}) {
  return fetch(`${getApiUrl()}${url}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });
}

export function apiUpload(url: string, options: RequestInit = {}) {
  return fetch(`${getApiUrl()}${url}`, {
    ...options
  });
}

function getApiUrl() {
  if (location.href.includes("localhost")) {
    return "http://localhost:3333";
  }

  return "https://project-node-typescript-backend.vercel.app";
}
