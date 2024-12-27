export abstract class Loader {
    abstract getLatestVersion(): Promise<string>;
    abstract versionExists(version: string): Promise<boolean>;
    abstract get name(): string;
    abstract downloadLoader(version: string, build: string): Promise<Blob>;
    abstract getLatestBuild(version: string): Promise<string>;
    get safeVersion(): string { return "1.21.4" }; // To be overridden if necessary

    async executeGetLatestVersion(): Promise<string> {
        try {
            return await this.getLatestVersion();
        } catch (e) {
            console.error(`Error while getting latest version, defaulting to ${this.safeVersion}`);
            return this.safeVersion;
        }
    }

    async executeDowwnloadLoader(version: string, build: string): Promise<Blob> {
        console.log(`Installing ${this.name}...`);
        if (!await this.versionExists(version)) {
            throw new Error(`Version ${version} does not exist on ${this.name}`);
        }
        return this.downloadLoader(version, build);
    }
}
