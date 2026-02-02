import { expect, test } from "vitest";
import { Block } from "../../src/domain/block";
import { BlockChain } from "../../src/domain/blockchain";

test("blockChain", () => {
  const now = new Date();
  const blockChain = new BlockChain<string>();

  const firstBlock = new Block(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    now.getTime(),
  );
  blockChain.addNewBlock(firstBlock);

  expect(blockChain.getLastBlock().hash).toEqual(firstBlock.hash);

  const secondBlock = new Block(
    "Sed velit risus, malesuada ac tortor non, volutpat volutpat mi",
    now.setMinutes(now.getMinutes() + 30),
  );
  blockChain.addNewBlock(secondBlock);

  expect(blockChain.getLastBlock().hash).toEqual(secondBlock.hash);

  const thirdBlock = new Block(
    "Curabitur iaculis nisi et lacus cursus, in accumsan turpis feugiat",
    now.setHours(now.getHours() + 12),
  );
  blockChain.addNewBlock(thirdBlock);

  expect(blockChain.getLastBlock().hash).toEqual(thirdBlock.hash);
  expect(blockChain.isValid()).toEqual(true);
});
