export class BasicAuthHelper {
  static decode(token: string): { username: string; password: string } {
    const [basicString, tokenValue] = token.split(" ");

    if (basicString != "Basic" || !tokenValue) {
      throw new Error("Not basic token");
    }

    const crendentials = Buffer.from(tokenValue, "base64").toString("ascii");
    const [username, password] = crendentials.split(":");

    return { username, password };
  }

  static encode({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): {
    basicToken: string;
  } {
    const tokenString = `${username}:${password}`;

    const basicToken = Buffer.from(tokenString).toString("base64");

    return { basicToken };
  }
}
