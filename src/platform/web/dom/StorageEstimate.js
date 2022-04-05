 

export async function estimateStorageUsage() {
    if (navigator?.storage?.estimate) {
        const {quota, usage} = await navigator.storage.estimate();
        return {quota, usage};
    } else {
        return {quota: null, usage: null};
    }
}
