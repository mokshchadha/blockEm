function updateCountOfBlockedSites() {
  const existingUrls = getUrlArray();
  const count = existingUrls.filter((e) => e.blocked.length > 0).length;
  const element = document.getElementById("blocked-site-count");
  element.innerText = element.innerText + " " + count;
}
function getUrlArray() {
  let existingData = JSON.parse(localStorage.getItem("blockEmUrls"));
  return existingData ? existingData : [];
}

updateCountOfBlockedSites();
