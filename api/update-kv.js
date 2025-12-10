import { kv } from '@vercel/kv';
export const runtime = 'edge';
// helper endpoint to update the KV store with latest healthcheck data based on /api/all (renamed from /api/healthcheck)
// fetches latest data from /api/all and stores it in KV under key 'healthcheck-data'
export async function GET(request) {
    try {
        const res = await fetch(`${new URL(request.url).origin}/api/all`);
        if (!res.ok) {
            return new Response('Failed to fetch healthcheck data', { status: 500 });
        }
        const data = await res.json();
        await kv.set('healthcheck-data', data);
        return new Response('KV store updated successfully', { status: 200 });
    }
    catch (error) {
        return new Response(`Error updating KV store: ${error.message || error}`, { status: 500 });
    }
}