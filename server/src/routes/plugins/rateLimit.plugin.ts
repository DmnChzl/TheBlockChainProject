import { Elysia, StatusMap, type HTTPHeaders } from "elysia";
import SimpleCache from "../../utils/cache";

interface RateLimitConfig {
  maxRequests?: number;
  windowMs?: number;
}

interface RateLimitContext {
  request: Request;
  server: Bun.Server<unknown> | null;
  set: {
    headers: HTTPHeaders;
    status?: number | keyof StatusMap;
  };
}

const getIpAddress = (request: Request, server: Bun.Server<unknown> | null) => {
  if (typeof server?.requestIP === "function") {
    const ip = server.requestIP(request);
    if (ip?.address) return ip.address;
  }

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded;

  const realIp = request.headers.get("x-real-ip");
  return realIp ?? "unknown";
};

const createRateLimit = (
  cache: SimpleCache<{ count: number }>,
  maxRequests: number,
) => {
  return ({ request, server, set }: RateLimitContext) => {
    const ipAddress = getIpAddress(request, server);
    const entry = cache.get(ipAddress);

    if (!entry) {
      cache.set(ipAddress, { count: 1 });
      return;
    }

    if (entry.count > maxRequests) {
      set.status = 429;

      return {
        status: "rejected",
        message: "Too Many Requests",
      };
    }

    cache.set(ipAddress, { count: entry.count + 1 });
  };
};

export const rateLimitPlugin = ({
  windowMs = 300_000, // 5 Minutes
  maxRequests = 50,
}: RateLimitConfig = {}) => {
  const cache = new SimpleCache<{ count: number }>(windowMs);

  return new Elysia({ name: "rate-limit-plugin" }).onRequest(
    createRateLimit(cache, maxRequests),
  );
};

export const rateLimitHandler = ({
  windowMs = 300_000, // 5 Minutes
  maxRequests = 50,
}: RateLimitConfig = {}) => {
  const cache = new SimpleCache<{ count: number }>(windowMs);
  return createRateLimit(cache, maxRequests);
};
