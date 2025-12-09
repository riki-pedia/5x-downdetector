// this is just to get the vercel web vitals analytics working
// might be removed later depending on how privacy conscious i feel
import { inject } from '@vercel/analytics';
inject();
async function loadStatus() {
  const res = await fetch("/api/healthcheck");
  const data = await res.json();
  const table = document.getElementById("region-status-table");
  table.innerHTML = "";

  const regions = Object.values(data);

  let allUp = true;

  regions.forEach(info => {
    if (!info.ok) allUp = false;

    const row = document.createElement("tr");
    row.className = "border-b border-gray-800";

    row.innerHTML = `
  <td class="py-3">${info.region}</td>

  <td class="py-3">
    <span class="${info.ok ? "text-green-400" : "text-red-500"}">● ${
      info.ok ? "Up" : "Down"
    }</span>
  </td>

  <td class="py-3">${info.status}</td>

  <td class="py-3">${info.time ?? "—"}</td>

  <td class="py-3">${info.localTime ?? info.local_time ?? "—"}</td>
`;

    table.appendChild(row);
  });

// The data object structure: { us: {...}, eu: {...}, asia: {...} }
const timestamps = regions.map(r => new Date(r.last_check).getTime());
const newest = new Date(Math.max(...timestamps));

document.getElementById("last-checked").textContent =
  newest.toLocaleString();


// region count
document.getElementById("region-count").textContent = regions.length;


  // Update banner
  const banner = document.getElementById("banner");
  const title = document.getElementById("banner-title");
  const desc = document.getElementById("banner-desc");

  if (allUp) {
    banner.className = "bg-green-500 text-black rounded-t-xl p-6";
    title.textContent = "All Systems Operational";
    desc.textContent = "Downdetector's Downdetector's Downdetector's Downdetector is responding normally from all regions.";
  } else {
    banner.className = "bg-red-500 text-black rounded-t-xl p-6";
    title.textContent = "Issues Detected";
    desc.textContent = "Some regions are reporting problems reaching the Downdetector's Downdetector's Downdetector's Downdetector.";
  }

  document.getElementById("last-checked").textContent =
    new Date().toLocaleTimeString();
  document.getElementById("region-count").textContent = regions.length;
}
async function refreshStatus() {
  const banner = document.getElementById("banner");
  const title = document.getElementById("banner-title");
  const desc = document.getElementById("banner-desc");
  banner.className = "bg-gray-500 text-black rounded-t-xl p-6";
  title.textContent = "Waiting";
  desc.textContent = "Checking status...";
  await loadStatus();
}
// initial load
loadStatus();

document.getElementById("refresh-btn").addEventListener("click", () => {
    console.log("Manual refresh triggered");
    refreshStatus();
});


// refresh every minute
setInterval(refreshStatus, 360000);
