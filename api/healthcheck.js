export const runtime = 'edge';
import { kv } from '@vercel/kv';
// helper to read the kv store and return the latest healthcheck data
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function GET() {
    try {
        const data = await kv.get('healthcheck-data');
        if (!data) {
            fetch(`${new URL(request.url).origin}/api/update-kv`);
            sleep(750);
            const freshData = await kv.get('healthcheck-data');
            if (!freshData) {
                return new Response('No healthcheck data available', { status: 500 });
            }
            return new Response(JSON.stringify(freshData), { status: 200 });
        }
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(`Error fetching healthcheck data: ${error.message || error}`, { status: 500 });
    }
}