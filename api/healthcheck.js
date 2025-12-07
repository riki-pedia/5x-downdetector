export const runtime = 'edge';

export async function GET() {
  const start = Date.now();

  const target = "https://riki-pedia.org/en/"; 
  let ok = false;
  let status = 0;

  try {
    const res = await fetch(target, { cache: "no-store" });
    status = res.status;
    ok = res.ok;
  } catch (err) {
    return Response.json({
      ok: false,
      error: "fetch_failed",
      region: process.env.VERCEL_REGION,
      time: Date.now() - start
    });
  }

  return Response.json({
    ok,
    status,
    region: process.env.VERCEL_REGION,
    time: `${Date.now() - start} ms`,
    last_check: new Date().toISOString()
  });
}