
import { postgres } from "../deps.js"

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({
    user: Deno.env.get("POSTGRES_USER"),
    password: Deno.env.get("POSTGRES_PASSWORD"),
    database: Deno.env.get("POSTGRES_DB"),
    hostname: Deno.env.get("POSTGRES_HOST"),
    port: Number(Deno.env.get("POSTGRES_PORT")),
  });
}

export { sql };