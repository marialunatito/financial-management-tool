import { jwtVerify, JWTPayload as Payload, SignJWT } from "jose";
import ms from "ms";
import { v4 } from "uuid";

export type JWTPayload = Pick<Payload, "aud" | "iss" | "sub"> & {
  exp: string;
  type?: string;
  [key: string]: unknown;
};

function getJwtSecretKey(secret: string): Uint8Array {
  return new Uint8Array(Buffer.from(secret, "base64"));
}

export async function generateJWT(
  secret: string,
  { aud, exp, iss, sub, ...payload }: JWTPayload
) {
  const now = new Date();
  const expirationTime = Math.floor((now.getTime() + ms("15m")) / 1000);

  const token = await new SignJWT(payload)
    .setAudience(aud || "be-mary-moon")
    .setExpirationTime(expirationTime)
    .setIssuedAt(now)
    .setIssuer("mary-moon")
    .setSubject(sub || "user")
    .setJti(v4())
    .setNotBefore(now)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .sign(getJwtSecretKey(secret));

  return token;
}

export async function verifyJWT<T extends JWTPayload>(
  secret: string,
  token: string
) {
  const { payload } = await jwtVerify<T>(token, getJwtSecretKey(secret));
  return payload;
}
