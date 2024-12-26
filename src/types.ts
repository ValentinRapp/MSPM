export type Package = {
    source: string,
    type: string;
    name: string,
    version: string
}

export type packageFile = {
    loader: {
        name: string,
        version: string,
        build: string
    };
    packages: Array<Package>
};