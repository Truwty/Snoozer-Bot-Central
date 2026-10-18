const statusLabel = document.querySelector("[data-status-label]");
const statusExplanation = document.querySelector("[data-status-explanation]");
const versionValue = document.querySelector("[data-version]");
const serverCountValue = document.querySelector("[data-server-count]");
const commandCountValue = document.querySelector("[data-command-count]");
const messageSentCountValue = document.querySelector("[data-message-sent-count]");
const checkedAtValue = document.querySelector("[data-checked-at]");
const uptimeValue = document.querySelector("[data-uptime]");
const refreshButton = document.querySelector("[data-status-refresh]");

function prettyUptime(totalSeconds) {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours || days) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  return parts.join(" ");
}

function setUnavailable(message) {
  statusLabel.textContent = "Unable to verify";
  statusLabel.dataset.state = "unavailable";
  statusExplanation.textContent = message;
  versionValue.textContent = "—";
  serverCountValue.textContent = "—";
  commandCountValue.textContent = "Unavailable";
  messageSentCountValue.textContent = "Unavailable";
  checkedAtValue.textContent = "—";
  uptimeValue.textContent = "—";
}

function validCount(value) {
  return Number.isFinite(value)
    && Number.isInteger(value)
    && Number.isSafeInteger(value)
    && value >= 0;
}

function validStatusPayload(payload) {
  return payload
    && (payload.status === "online" || payload.status === "offline")
    && typeof payload.version === "string"
    && (payload.server_count === null || (Number.isInteger(payload.server_count) && payload.server_count >= 0))
    && typeof payload.checked_at === "string"
    && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|\+00:00)$/.test(payload.checked_at)
    && Number.isFinite(Date.parse(payload.checked_at))
    && Number.isFinite(payload.uptime_seconds)
    && payload.uptime_seconds >= 0;
}

function displayCount(element, value) {
  element.textContent = validCount(value) ? value.toLocaleString() : "Unavailable";
}

async function loadStatus() {
  const endpoint = window.SNOOZER_STATUS_API_URL;
  if (typeof endpoint !== "string" || !endpoint.trim()) {
    setUnavailable("No public status endpoint is configured for this website. Live bot status cannot be verified here.");
    return;
  }

  let url;
  try {
    url = new URL(endpoint, window.location.href);
  } catch {
    setUnavailable("The configured status endpoint URL is invalid, so the bot status cannot be verified.");
    return;
  }
  if (url.protocol !== "https:") {
    setUnavailable("The configured status endpoint must use HTTPS before this page can request it.");
    return;
  }

  refreshButton.disabled = true;
  refreshButton.textContent = "Checking…";
  statusLabel.textContent = "Checking";
  statusLabel.dataset.state = "checking";
  statusExplanation.textContent = "Requesting the configured public endpoint. An unreachable endpoint does not mean the bot is offline.";
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: "no-store", credentials: "omit", headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Status request failed");
    const payload = await response.json();
    if (!validStatusPayload(payload)) throw new Error("Status response did not match the published contract");

    statusLabel.textContent = payload.status === "online" ? "Online" : "Offline";
    statusLabel.dataset.state = payload.status;
    statusExplanation.textContent = payload.status === "online"
      ? "The configured endpoint currently reports Snoozer as online."
      : "The configured endpoint currently reports Snoozer as offline.";
    versionValue.textContent = payload.version;
    serverCountValue.textContent = payload.server_count === null
      ? "Unavailable"
      : String(payload.server_count);
    displayCount(commandCountValue, payload.command_count);
    displayCount(messageSentCountValue, payload.message_sent_count);
    checkedAtValue.textContent = new Date(payload.checked_at).toLocaleString(undefined, { timeZone: "UTC", timeZoneName: "short" });
    uptimeValue.textContent = prettyUptime(payload.uptime_seconds);
  } catch {
    setUnavailable("The public status endpoint could not be reached or returned an invalid response. This is not evidence that Snoozer is offline.");
  } finally {
    window.clearTimeout(timeout);
    refreshButton.disabled = false;
    refreshButton.textContent = "Check again";
  }
}

refreshButton.addEventListener("click", loadStatus);
loadStatus();
window.setInterval(loadStatus, 30_000);
