import type { packageFile } from "../types";

export abstract class Source {
    abstract get name(): string;
    abstract searchPackages(packageType: string, query: string, packageFile: packageFile | null): Promise<string[]>;

    async executeSearchPackages(packageType: string, query: string): Promise<void> {
        let packageFile: packageFile | null = null;

        try {
            packageFile = await Bun.file('mspm.json').json();
        } catch (e) {
            console.log("No mspm project was found, creating one using 'mspm init' allows for better search results\n");
        }

        this.searchPackages(packageType, query, packageFile)
            .then(packages => packages.forEach(pkg => console.log(pkg)));
    }
}