export type Package = {
    source: string,
    type: string;
    name: string,
    version: string
};

export type Loader = {
    name: string,
    version: string,
    build: string
};

export type packageFile = {
    loader: Loader
    packages: Array<Package>
};