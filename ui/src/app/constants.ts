const LOCAL_STORAGE_TOKEN_LABEL = "id_token";
const BACKEND_URL = "http://localhost:8700";
const DEFAULT_BOOKS_QUERY = "Java";

export enum ListType {
  FAVOURTIES = "favourites",
  ALREADY_READ = "alreadyread",
  WISH_TO_READ = "wishlist"
}

export const constants = {
  BACKEND_URL,
  LOCAL_STORAGE_TOKEN_LABEL,
  DEFAULT_BOOKS_QUERY
}