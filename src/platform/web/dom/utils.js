 

export function domEventAsPromise(element, successEvent) {
    return new Promise((resolve, reject) => {
        let detach;
        const handleError = evt => {
            detach();
            reject(evt.target.error);
        };
        const handleSuccess = () => {
            detach();
            resolve();
        };
        detach = () => {
            element.removeEventListener(successEvent, handleSuccess);
            element.removeEventListener("error", handleError);
        };
        element.addEventListener(successEvent, handleSuccess);
        element.addEventListener("error", handleError);
    });
}
