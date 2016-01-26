export function urljoin(...args) {
    return args.map((part) => {
        return part.replace(/\/$/, '');
    }).join('/');
}
