async function main() {
  const existingUrls = await getUrlArray();
  setInterval(() => {
    console.log("running set interval");
    const currentUrl = window.location.href;
    const blockedUrl = existingUrls.find((e) => currentUrl.includes(e.blocked));
    console.log({ blockedUrl, existingUrls, currentUrl });
    if (!blockedUrl) return;
    window.location.href = blockedUrl.redirect;
  }, 1000);
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

main();
