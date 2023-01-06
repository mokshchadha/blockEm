chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (
    request.messageId ===
    "run_the_main_script_1b537bc7-dd23-4958-993a-5134c421120d"
  ) {
    checkCurrentUrl();
  }
});

async function checkCurrentUrl() {
  const existingUrls = await getUrlArray();
  const currentUrl = window.location.href;
  const blockedUrl = existingUrls.find((e) => currentUrl.includes(e.blocked));
  if (!blockedUrl) return;
  window.location.href = blockedUrl.redirect;
}

async function getUrlArray() {
  let existingData = JSON.parse(localStorage.getItem("blockEmUrls"));
  if (chrome.storage.local) {
    try {
      const data = await chrome.storage.local.get(["blockEmUrls"]);
      return data?.blockEmUrls ? JSON.parse(data.blockEmUrls) : [];
    } catch (error) {
      return [];
    }
  }
  return existingData ? existingData : [];
}
