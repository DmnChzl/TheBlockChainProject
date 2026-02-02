import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import blockChainService from "./domain/blockchain.service";
import { createBlockChainRoute } from "./routes/api/blockchain.route";
import { createEnrollRoute } from "./routes/api/enroll.route";
import { createVerifyRoute } from "./routes/api/verify.route";

const { server } = new Elysia()
  .use(
    cors({
      origin: "http://localhost:4200",
      allowedHeaders: ["Content-Type"],
      methods: ["GET", "POST"],
    }),
  )
  .get("/health", () => ({ message: "Healthy" }))
  .use(createBlockChainRoute(blockChainService))
  .use(createEnrollRoute(blockChainService))
  .use(createVerifyRoute(blockChainService))
  .listen(process.env["PORT"] || 3000);

// eslint-disable-next-line no-console
console.log(`
   +------+
  /      /|
 /      / |
+------+  +
| RUN: | /
| ${server?.port} |/
+------+
`);
