import { generateJWT, JWTPayload, verifyJWT } from "./../../shared/jwt";

export interface UserClaims {
  id: string;
  email: string;
}

export interface Claims extends JWTPayload {
  user?: UserClaims;
  type: "access" | "refresh";
}

export async function generateTokenPair(claims: Omit<Claims, "type">) {
  if (!process.env.AUTH_SECREAT_KEY)
    throw new Error(`AUTH_SECREAT_KEY not found`);

  const accessToken = await generateJWT(process.env.AUTH_SECREAT_KEY, {
    ...claims,
    aud: "be-mary-moon",
    iss: "mary-moon",
    exp: "15m",
    type: "access",
  });

  if (!process.env.REFRESH_SECRET_KEY)
    throw new Error(`REFRESH_SECRET_KEY not found`);

  const refreshToken = await generateJWT(process.env.REFRESH_SECRET_KEY, {
    ...claims,
    aud: "be-mary-moon",
    iss: "mary-moon",
    exp: "10 days",
    type: "refresh",
  });

  return {
    accessToken,
    refreshToken,
  };
}

async function validateToken(token: string, secret: string): Promise<Claims> {
  const claims = await verifyJWT<Claims>(secret, token);
  return claims;
}

export async function validateAccessToken(token: string) {
  if (!process.env.AUTH_SECREAT_KEY)
    throw new Error("AUTH_SECREAT_KEY not found");
  return validateToken(token, process.env.AUTH_SECREAT_KEY);
}

export async function validateRefreshToken(token: string) {
  if (!process.env.REFRESH_SECREAT_KEY)
    throw new Error("REFRESH_SECREAT_KEY not found");
  return validateToken(token, process.env.REFRESH_SECREAT_KEY);
}
