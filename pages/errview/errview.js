const url = new URL(window.location.href);
const errorTitle = url.searchParams.get("title") || "Unknown Error";
const errorMessage = url.searchParams.get("message") || "Failed to load error details.";

document.getElementById("title").textContent = errorTitle;
document.getElementById("message").textContent = errorMessage;

const openErrorsBtn = document.getElementById("openErrors");
const openExtInfoBtn = document.getElementById("openExtInfo");
if (typeof browser === "undefined") {
    openErrorsBtn.addEventListener("click", () => {
        chrome.tabs.create({ url: "about:extensions/?errors=" + chrome.runtime.id });
        window.close();
    });
    openExtInfoBtn.addEventListener("click", () => {
        chrome.tabs.create({ url: "about:extensions/?id=" + chrome.runtime.id });
    });
} else {
    // No such page in Firefox
    openErrorsBtn.style.display = "none";
    // Firefox denies opening about:debugging
    openExtInfoBtn.style.display = "none";
    document.getElementById("guide").textContent = "To open the extension DevTools, navigate to about:debugging, and click This Firefox (or the name of the Firefox fork you are using). Then find the Vineless extension in the list, and click the \"Inspect\" button.";
}