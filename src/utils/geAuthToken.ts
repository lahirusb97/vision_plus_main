// utils.ts (or helpers.ts)

export function getTokenFromLocalStorage(): string | null {
  return localStorage.getItem("vision_plus_token");
}
