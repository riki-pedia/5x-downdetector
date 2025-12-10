const currentTime = new Date()
const currentTimeISO = currentTime.toISOString();
console.log(`Current Time in ISO format: ${currentTimeISO}`);
console.log(`Current Time in Locale String: ${currentTime.toLocaleString()}`);
console.log(`Current Time in Milliseconds since Epoch: ${currentTime.getTime()}`);
console.log(`just plain current time: ${currentTime}`);
const data = {};
const time = new Date();
const epochMillis = time.getTime();
const expireTimeMillis = epochMillis + 5 * 60 * 1000;
data.expires_at = expireTimeMillis;
console.log(`Data Expires At: ${data.expires_at}`);
console.log(`expires_at as Date: ${new Date(data.expires_at)}`);
if (1765330195599 < new Date().getTime()) {
    console.log("Data has expired.");
}