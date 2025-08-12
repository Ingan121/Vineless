async function processMessage(detail) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({
            type: detail.type,
            body: detail.body,
            from: "content"
        }, (response) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(response);
        });
    })
}

document.addEventListener('response', async (event) => {
    const { detail } = event;
    const responseData = await processMessage(detail);
    const responseEvent = new CustomEvent('responseReceived', {
        detail: detail.requestId.concat(responseData)
    });
    document.dispatchEvent(responseEvent);
});
