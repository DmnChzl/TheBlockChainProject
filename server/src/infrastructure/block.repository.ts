import { asc, eq } from "drizzle-orm";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { Block } from "../domain/block";
import type { FileRecord } from "../routes/payloads/fileRecord";
import type { BlockSQLiteTable } from "./schema";

export class BlockRepository {
  #database: BunSQLiteDatabase;
  #table: BlockSQLiteTable;

  constructor(database: BunSQLiteDatabase, table: BlockSQLiteTable) {
    this.#database = database;
    this.#table = table;
  }

  async findAll(): Promise<Block<FileRecord>[]> {
    const rows = await this.#database
      .select()
      .from(this.#table)
      .orderBy(asc(this.#table.timestamp));

    return rows.map((row) => {
      const block = new Block<FileRecord>(
        row.data as FileRecord,
        row.timestamp,
      );
      block.hash = row.hash;
      block.prevHash = row.prevHash;
      return Object.freeze(block);
    });
  }

  async findOneByFileHash(
    fileHash: string,
  ): Promise<Block<FileRecord> | undefined> {
    const [row] = await this.#database
      .select()
      .from(this.#table)
      .where(eq(this.#table.data, { fileHash } as FileRecord));

    if (!row) return undefined;
    const block = new Block<FileRecord>(row.data as FileRecord, row.timestamp);
    block.hash = row.hash;
    block.prevHash = row.prevHash;
    return Object.freeze(block);
  }

  async create(block: Block<FileRecord>) {
    await this.#database.insert(this.#table).values({
      data: block.data,
      hash: block.hash,
      prevHash: block.prevHash,
      timestamp: block.timestamp,
    });
  }
}
