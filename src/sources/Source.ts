import type { Package, packageFile } from "../types";

export abstract class Source {
    abstract get name(): string;
    abstract get packageTypes(): string[];
    abstract searchPackages(packageType: string, query: string, packageFile: packageFile | null): Promise<string[]>;
    abstract addPackage(packageType: string, packageName: string, packageFile: packageFile): Promise<Package>;
    abstract downloadPackage(packageInfo: Package): Promise<Blob>;

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

    async executeAddPackage(packageType: string, packageName: string) {
        let packageFile: packageFile;

        try {
            packageFile = await Bun.file('mspm.json').json();
        } catch (e) {
            console.error("No project was created, can't add package");
            process.exit(1);
        }

        const pkg = await this.addPackage(packageType, packageName, packageFile);

        if (!packageFile.packages.find(p => p.name === pkg.name)) {
            packageFile.packages.push(pkg);
        } else {
            // must call the update package method when that gets implemented
            console.error("Package already exists in project, updating it instead... (to be implemented)");
            process.exit(0);
        }

        await Bun.write('mspm.json', JSON.stringify(packageFile, null, 4));

        console.log("Added package Successfully, run 'mspm install' next");
    }
}