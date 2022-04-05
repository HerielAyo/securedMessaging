

export async function poll(fn) {
    do {
        const result = fn();
        if (result) {
            return result;
        } else {
            await new Promise(setImmediate); //eslint-disable-line no-undef
        }
    } while (1); //eslint-disable-line no-constant-condition
}