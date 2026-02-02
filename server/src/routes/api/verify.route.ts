import Elysia from "elysia";
import type { BlockChainService } from "../../domain/blockchain.service";
import { fileRecordSchema } from "../payloads/fileRecord";

const VERIFY_PATH = "/api/verify";

export const createVerifyRoute = (service: BlockChainService) => {
  return new Elysia({ prefix: VERIFY_PATH }).post(
    "/",
    ({ body, set }) => {
      const result = service.verifyFile(body.fileHash);

      if (result.isLeft()) {
        set.status = result.error.statusCode;
        return { status: "rejected", message: result.error.message };
      }
      return { status: "fulfilled", data: result.value };
    },
    { body: fileRecordSchema },
  );
};
