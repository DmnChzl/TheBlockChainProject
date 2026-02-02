import Elysia from "elysia";
import type { BlockChainService } from "../../domain/blockchain.service";

const BLOCKCHAIN_PATH = "/api/blockchain";

export const createBlockChainRoute = (service: BlockChainService) => {
  return new Elysia({ prefix: BLOCKCHAIN_PATH }).get("/", ({ set }) => {
    const result = service.getBlockChainState();

    if (result.isLeft()) {
      set.status = result.error.statusCode;
      return { status: "rejected", message: result.error.message };
    }
    return { status: "fulfilled", data: result.value };
  });
};
