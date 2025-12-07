export const runtime = 'edge';

export async function GET() {
  // this is a function that contacts the healthcheck apis in different regions
  const euServer = "https://eu-healthcheck.vercel.app/api/eu-healthcheck";
  const usServer = "https://us-healthcheck.vercel.app/api/us-healthcheck";
  const asiaServer = "https://asia-healthcheck.vercel.app/api/asia-healthcheck";
  const usResponse = await fetch(usServer);
  const euResponse = await fetch(euServer);
  const asiaResponse = await fetch(asiaServer);
  const usData = await usResponse.json();
  const euData = await euResponse.json();
  const asiaData = await asiaResponse.json();
  return new Response(JSON.stringify({
    us: usData,
    eu: euData,
    asia: asiaData
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}