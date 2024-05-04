export function api(url: string, options: RequestInit = {}) {
  return fetch(
    `https://project-node-typescript-backend.vercel.app/customer${url}`,
    {
      headers: {
        "Content-Type": "application/json"
      },
      ...options
    }
  );
}

export function apiUpload(url: string, options: RequestInit = {}) {
  return fetch(
    `https://project-node-typescript-backend.vercel.app/customer${url}`,
    {
      ...options
    }
  );
}
