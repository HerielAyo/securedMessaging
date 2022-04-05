 


export function formatSize(size: number, decimals: number = 2): string {
    if (Number.isSafeInteger(size)) {
        const base = Math.min(3, Math.floor(Math.log(size) / Math.log(1024)));
        const formattedSize = Math.round(size / Math.pow(1024, base)).toFixed(decimals);
        switch (base) {
            case 0: return `${formattedSize} bytes`;
            case 1: return `${formattedSize} KB`;
            case 2: return `${formattedSize} MB`;
            case 3: return `${formattedSize} GB`;
        }
    }
    return "";
}
