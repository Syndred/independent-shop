export type CrmTrackingConfig = {
  endpoint: URL;
  authorization?: string;
};

function isLoopback(hostname: string): boolean {
  const normalized = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  return (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1"
  );
}

function allowedOrigins(): Set<string> {
  return new Set(
    (process.env.CRM_TRACKING_ALLOWED_ORIGINS || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .flatMap((value) => {
        try {
          return [new URL(value).origin];
        } catch {
          return [];
        }
      }),
  );
}

export function getCrmTrackingConfig(): CrmTrackingConfig | undefined {
  const rawEndpoint = process.env.CRM_TRACKING_ENDPOINT?.trim();
  if (!rawEndpoint) return undefined;

  let endpoint: URL;
  try {
    endpoint = new URL(rawEndpoint);
  } catch {
    console.warn("[crm-tracking] rejected invalid endpoint configuration");
    return undefined;
  }

  const isProduction = process.env.NODE_ENV === "production";
  const secure = endpoint.protocol === "https:";
  const localDevelopment =
    !isProduction &&
    endpoint.protocol === "http:" &&
    isLoopback(endpoint.hostname);

  if (
    (!secure && !localDevelopment) ||
    !allowedOrigins().has(endpoint.origin)
  ) {
    console.warn("[crm-tracking] rejected unsafe or non-allowlisted endpoint");
    return undefined;
  }

  const token = process.env.CRM_TRACKING_TOKEN?.trim();
  return {
    endpoint,
    // Never put a bearer credential on a cleartext request, even in development.
    authorization: secure && token ? `Bearer ${token}` : undefined,
  };
}
