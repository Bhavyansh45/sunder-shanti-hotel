// Timestamp helpers — Motoko uses nanoseconds, JS Date uses milliseconds
export function timestampToDate(ts: bigint): Date {
  return new Date(Number(ts / 1_000_000n));
}

export function dateToTimestamp(date: Date): bigint {
  return BigInt(date.getTime()) * 1_000_000n;
}

export function formatDate(ts: bigint): string {
  return timestampToDate(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(ts: bigint): string {
  return timestampToDate(ts).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function calcNights(checkIn: bigint, checkOut: bigint): number {
  const msIn = Number(checkIn / 1_000_000n);
  const msOut = Number(checkOut / 1_000_000n);
  const diff = msOut - msIn;
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// Unwrap Result variant from backend — throws on err
export function unwrapResult<T>(
  result: { __kind__: "ok"; ok: T } | { __kind__: "err"; err: string },
): T {
  if (result.__kind__ === "err") {
    throw new Error(result.err);
  }
  return result.ok;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
