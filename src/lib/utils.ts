const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatRelativeTime(dateString: string): string {
  const diffSec = Math.round((new Date(dateString).getTime() - Date.now()) / 1000);
  const absSec = Math.abs(diffSec);

  if (absSec < 60) return "just now";
  if (absSec < 3600) return rtf.format(Math.round(diffSec / 60), "minute");
  if (absSec < 86400) return rtf.format(Math.round(diffSec / 3600), "hour");
  if (absSec < 2592000) return rtf.format(Math.round(diffSec / 86400), "day");
  if (absSec < 31536000) return rtf.format(Math.round(diffSec / 2592000), "month");
  return rtf.format(Math.round(diffSec / 31536000), "year");
}

export function truncateMessage(message: string, maxLength = 48): string {
  const firstLine = message.split("\n")[0]?.trim() ?? message;
  return firstLine.length <= maxLength ? firstLine : `${firstLine.slice(0, maxLength - 3)}...`;
}
