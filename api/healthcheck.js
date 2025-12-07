export const runtime = 'edge';

async function safeFetch(url) {
  try {
    const startTime = Date.now();
    const res = await fetch(url);
    let region = "";
    if (url.includes("us")) region = "San Francisco, CA, US";
    else if (url.includes("eu")) region = "Frankfurt, Germany";
    else if (url.includes("asia")) region = "Tokyo, Japan";
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: `HTTP ${res.status}`,
        region,
        local_time: new Date().toLocaleString(),
        last_check: new Date().toISOString(),
        time: `${Date.now() - startTime} ms`,
      };
    }

    // Some error pages still send HTML with 200 status
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return {
        ok: false,
        status: res.status,
        error: "Non-JSON response",
        region,
        local_time: new Date().toLocaleString(),
        last_check: new Date().toISOString(),
        time: `${Date.now() - startTime} ms`,
      };
    }

    return await res.json();
  } catch (e) {
    return {
      ok: false,
      status: 0,
      error: e.message,
      region,
      local_time: new Date().toLocaleString(),
      last_check: new Date().toISOString(),
      time: `${Date.now() - startTime} ms`,
    };
  }
}

export async function GET() {
  const servers = {
    us: "https://us-healthcheck.vercel.app/api/us-healthcheck",
    eu: "https://eu-healthcheck.vercel.app/api/eu-healthcheck",
    asia: "https://asia-healthcheck.vercel.app/api/asia-healthcheck",
  };

  // Fire all requests at once
  const [usRes, euRes, asiaRes] = await Promise.all([
    safeFetch(servers.us),
    safeFetch(servers.eu),
    safeFetch(servers.asia)
  ]);

   return Response.json({ us: usRes, eu: euRes, asia: asiaRes, });
}
