chrome.tabs?.onUpdated?.addListener((tabId, changeInfo, tabInfo) => {
  if (tabInfo.active === true && changeInfo.status == "complete") {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab) return;
        if (tab.id && tab.url.includes("http"))
          chrome?.tabs?.sendMessage(tab.id, {
            messageId:
              "run_the_main_script_1b537bc7-dd23-4958-993a-5134c421120d",
          });
      });
    } catch (error) {
      console.log("error in send message no big issue");
    }
  }
});
