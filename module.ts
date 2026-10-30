import { module } from "@prisma/composer";
import { envParam, envSecret, rawPostgres } from "@prisma/composer-prisma-cloud";
import appService from "./service.ts";

export default module("prisma", ({ provision }) => {
  const db = provision(rawPostgres({ name: "jkcapital-database" }));
  provision(appService, { deps: { db }, input: {
    demoMode: false, currency: "EUR", publicRegistration: false,
    sessionSecret: envSecret("SESSION_SECRET"),
    adminEmail: envParam("ADMIN_EMAIL"),
    adminPassword: envSecret("ADMIN_PASSWORD")
  }});
});
