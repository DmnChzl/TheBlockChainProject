import { bgHex } from "ansis";
import Elysia from "elysia";

// eslint-disable-next-line no-console
const log = console.log;

const CHALK: Record<string, string> = {
  GET: "#4ade80", // Green
  HEAD: "#4ade80",
  POST: "#facc15", // Yellow
  PUT: "#fb923c", // Orange
  PATCH: "#fb923c",
  DELETE: "#f87171", // Red
  OPTIONS: "#60a5fa", // Blue
};

interface LoggerConfig {
  enabled?: boolean;
}

interface LoggerContext {
  request: Request;
}

const createLogger = (enabled: boolean) => {
  return ({ request }: LoggerContext) => {
    if (!enabled) return;

    const styleText = bgHex(CHALK[request.method] ?? "#fff");
    log(`${styleText` ${request.method} `} ${new URL(request.url).pathname}`);
  };
};

export const loggerPlugin = ({ enabled = true }: LoggerConfig = {}) => {
  return new Elysia({ name: "logger-plugin" }).onRequest(createLogger(enabled));
};

export const loggerHandler = ({ enabled = true }: LoggerConfig = {}) => {
  return createLogger(enabled);
};
