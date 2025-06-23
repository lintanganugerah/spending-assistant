import { BaseApiResponseTypes } from "./BaseApiResponseTypes";

export type TokenState = {
  token: string;
};

export type AuthInitResponse = TokenState & BaseApiResponseTypes;
