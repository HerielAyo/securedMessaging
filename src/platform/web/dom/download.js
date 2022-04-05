 

export async function downloadInIframe(container, iframeSrc, blobHandle, filename, isIOS) {
    let iframe = container.querySelector("iframe.downloadSandbox");
    if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.setAttribute("sandbox", "allow-scripts allow-downloads allow-downloads-without-user-activation");
        iframe.setAttribute("src", iframeSrc);
        iframe.className = "hidden downloadSandbox";
        container.appendChild(iframe);
        let detach;
        await new Promise((resolve, reject) => {
            detach = () => {
                iframe.removeEventListener("load", resolve);
                iframe.removeEventListener("error", reject);    
            }
            iframe.addEventListener("load", resolve);
            iframe.addEventListener("error", reject);
        });
        detach();
    }
    if (isIOS) {
        // iOS can't read a blob in a sandboxed iframe,
        // see https://github.com/vector-im/hydrogen-web/issues/244
        const buffer = await blobHandle.readAsBuffer();
        iframe.contentWindow.postMessage({
            type: "downloadBuffer",
            buffer,
            mimeType: blobHandle.mimeType,
            filename: filename
        }, "*");
    } else {
        iframe.contentWindow.postMessage({
            type: "downloadBlob",
            blob: blobHandle.nativeBlob,
            filename: filename
        }, "*");
    }
}
