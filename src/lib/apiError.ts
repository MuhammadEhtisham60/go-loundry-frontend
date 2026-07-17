/**
 * Extracts a human-readable error message from a DRF/StandardResponse error.
 *
 * Response shape:
 * {
 *   success: false,
 *   message: "Validation failed",
 *   errors: { phone: ["Already exists."], email: ["Invalid."] }
 * }
 */
export function extractApiError(err: unknown, fallback = "Something went wrong"): string {
  console.error("extractApiError received error object:", err);

  try {
    if (!err || typeof err !== "object") {
      return fallback;
    }

    const errorObj = err as Record<string, any>;
    const data = errorObj.data;

    if (data && typeof data === "object") {
      const errors = data.errors;
      if (errors && typeof errors === "object" && !Array.isArray(errors)) {
        const messages: string[] = [];
        for (const [field, msgs] of Object.entries(errors)) {
          if (msgs) {
            const list = Array.isArray(msgs) ? msgs : [String(msgs)];
            list.forEach((m) => {
              const label = field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " ");
              messages.push(`${label}: ${m}`);
            });
          }
        }
        if (messages.length > 0) {
          return messages.join(", ");
        }
      }

      if (data.message) {
        return String(data.message);
      }
    }

    // Support standard message/error top level shapes if they exist
    if (errorObj.message) {
      return String(errorObj.message);
    }
    if (errorObj.error) {
      return String(errorObj.error);
    }
  } catch (e) {
    console.error("Failed to parse API error:", e);
  }

  return fallback;
}
