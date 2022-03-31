chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "developer.chrome.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });

  //设置状态或进行一次初始化
  chrome.contextMenus.create({
    id: "sampleContextMenu",
    title: "Sample Context Menu",
    contexts: ["selection"],
  });
});

// 设置监听器 This will run when a bookmark is created.
chrome.bookmarks.onCreated.addListener(function () {
  // do something
});

//如果扩展正在监听 tabs.onUpdated 事件，请尝试将 webNavigation.onCompleted 事件与过滤器一起使用，因为 tabs API 不支持过滤器。
chrome.webNavigation.onCompleted.addListener(
  function () {
    alert("This is my favorite website!");
  },
  { url: [{ urlMatches: "https://www.google.com/" }] }
);

chrome.runtime.onMessage.addListener(function (message, callback) {
  if (message.data == "setAlarm") {
    chrome.alarms.create({ delayInMinutes: 5 });
  } else if (message.data == "runLogic") {
    chrome.tabs.executeScript({ file: "logic.js" });
  } else if (message.data == "changeColor") {
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="orange"',
    });
  }
});
