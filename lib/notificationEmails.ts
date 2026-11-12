// Parsing for "who gets notified" fields, which accept one address or several
// separated by commas. Safe to use in the browser and on the server.

const EMAIL_PATTERN = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/;

export const parseNotificationEmails = (
  value: string | null | undefined
): { valid: string[]; invalid: string[] } => {
  const valid: string[] = [];
  const invalid: string[] = [];

  for (const entry of (value || '').split(/[,;\n]/)) {
    const email = entry.trim().toLowerCase();
    if (!email) continue;

    if (!EMAIL_PATTERN.test(email)) {
      invalid.push(entry.trim());
    } else if (!valid.includes(email)) {
      valid.push(email);
    }
  }

  return { valid, invalid };
};
