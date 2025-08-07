import { generateJWT, JWTPayload, verifyJWT } from "../../shared/jwt";

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

function validateToken(token: string, secret: string): Promise<Claims> {
  return verifyJWT<Claims>(secret, token);
}

export function validateAccessToken(token: string) {
  if (!process.env.AUTH_SECREAT_KEY)
    throw new Error("AUTH_SECREAT_KEY not found");

  console.log("process.env.AUTH_SECREAT_KEY: ", process.env.AUTH_SECREAT_KEY);
  return validateToken(token, process.env.AUTH_SECREAT_KEY);
}

export function validateRefreshToken(token: string) {
  if (!process.env.REFRESH_SECREAT_KEY)
    throw new Error("REFRESH_SECREAT_KEY not found");
  return validateToken(token, process.env.REFRESH_SECREAT_KEY);
}
