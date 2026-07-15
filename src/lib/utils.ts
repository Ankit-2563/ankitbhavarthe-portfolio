const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 60 * 60],
  ["month", 30 * 24 * 60 * 60],
  ["week", 7 * 24 * 60 * 60],
  ["day", 24 * 60 * 60],
  ["hour", 60 * 60],
  ["minute", 60],
];

export function formatRelativeTime(dateString: string): string {
  const elapsed = (new Date(dateString).getTime() - Date.now()) / 1000;
  for (const [unit, secs] of UNITS) {
    if (Math.abs(elapsed) >= secs) return rtf.format(Math.round(elapsed / secs), unit);
  }
  return "just now";
}

export function truncateMessage(message: string, maxLength = 48): string {
  const firstLine = message.split("\n")[0]?.trim() ?? message;
  if (firstLine.length <= maxLength) return firstLine;
  return `${firstLine.slice(0, maxLength - 3)}...`;
}
