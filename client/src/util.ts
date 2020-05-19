export function error(msg: string): never {
    throw new TypeError(msg);
}

export function trim(obj: { [key: string]: string | undefined }) {
    const r = <{ [key: string]: string }>{};
    for (const entry of Object.entries(obj)) {
        if (entry[1] != null) r[entry[0]] = entry[1];
    }
    return r;
}