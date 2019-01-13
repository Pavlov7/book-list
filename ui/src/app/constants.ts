const LOCAL_STORAGE_TOKEN_LABEL = "id_token";
const BACKEND_URL = "http://localhost:8700";
const DEFAULT_BOOKS_QUERY = "Java";
const BACKEND_SOCKET_URL = BACKEND_URL + "/ws";

export enum ListType {
  CURRENTLY_READING = "currentlyreading",
  ALREADY_READ = "alreadyread",
  WISH_TO_READ = "wishlist"
}

// I know they're the same :D
export enum BookList {
  ALREADY_READ = "ALREADY_READ",
  CURRENTLY_READING = "CURRENTLY_READING",
  WISH_TO_READ = "WISH_TO_READ"
}

export const constants = {
  BACKEND_URL,
  BACKEND_SOCKET_URL,
  LOCAL_STORAGE_TOKEN_LABEL,
  DEFAULT_BOOKS_QUERY
}