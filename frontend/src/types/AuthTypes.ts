import { BaseApiResponseTypes } from "./BaseApiResponseTypes";

export type TokenState = {
  token: string;
};

export type CheckExpiredTokenResponse = {
  expired: boolean;
} & BaseApiResponseTypes;

export type AuthInitResponse = TokenState & BaseApiResponseTypes;
