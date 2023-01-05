async function main() {
  const existingUrls = await getUrlArray();
  const addButton = document.getElementById("add");
  addButton.onclick = () => appendValuesInLocalStorage(existingUrls);
  createList(existingUrls);
  removeButtons();
}

async function removeFromLocalStorage({ blocked, redirect }) {
  const allUrls = await getUrlArray();
  if (allUrls.length === 0) return;
  const newUrls = allUrls.filter((e) => e.blocked !== blocked);
  setUrlArray(newUrls);
}

function appendValuesInLocalStorage(existingUrls) {
  const blockedInput = document.getElementById("blocked");
  const redirectInput = document.getElementById("redirect");
  const blockedURL = blockedInput.value;
  const redirectURL = redirectInput.value;

  if (blockedURL.trim().length == 0) {
    alert("Blocked URL cannot be Empty");
    return;
  }
  if (redirectURL.trim().length == 0) {
    alert("RedirectURL URL cannot be Empty");
    return;
  }

  const newUrls = [
    ...existingUrls,
    { blocked: blockedURL, redirect: redirectURL },
  ];

  setUrlArray(newUrls);
  createList(newUrls);
}

function removeButtons() {
  var listButtons = document.querySelectorAll(".remove");
  for (var i = 0; i < listButtons.length; i++) {
    listButtons[i].onclick = function () {
      const data = this.parentNode.innerText
        .split("--")
        .map((e) => e.trim())
        .filter((e) => e);
      const [blocked, redirect] = data ?? [];
      console.log({ blocked, redirect });
      if (blocked && redirect) removeFromLocalStorage({ blocked, redirect });
      this.parentNode.remove();
    };
  }
}

function createList(existingUrls) {
  const list = document.getElementById("main-list");
  list.innerHTML = existingUrls.reduce(
    (a, e) =>
      a +
      `<li class='list-item'><span class='blocked-url'>${e.blocked}</span> -- <span class='redirect-url'>${e.redirect}</span> ` +
      `<button class='remove'>Remove</button></li>`,
    ""
  );
}

function setUrlArray(array) {
  const sanitisedArray = array
    .map((e) => ({
      blocked: e.blocked.trim(),
      redirect: e.redirect.trim(),
    }))
    .filter((e) => e.blocked && e.redirect);

  localStorage.setItem("blockEmUrls", JSON.stringify(sanitisedArray));
  if (chrome.storage.local) {
    chrome.storage.local
      .set({ blockEmUrls: JSON.stringify(sanitisedArray) })
      .then((e) => console.log("saved in the storage"));
  }
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
