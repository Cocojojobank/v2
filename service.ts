import node from "@prisma/composer/node";
import { compute, rawPostgres } from "@prisma/composer-prisma-cloud";
import { secretString } from "@prisma/composer/arktype";
import { type } from "arktype";

const appInput = type({
  demoMode: "boolean", currency: "string", publicRegistration: "boolean",
  sessionSecret: secretString(), "adminEmail?": "string", "adminPassword?": secretString()
});

export default compute({
  name: "app", input: appInput, deps: { db: rawPostgres() },
  build: node({ module: import.meta.url, entry: "./dist/server.mjs" })
});
