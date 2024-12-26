import type { Package, packageFile } from "../types";
import { Source } from "./Source";

export class Modrinth extends Source {
    get name() {
        return "Modrinth";
    }

    get packageTypes() {
        return ["plugin", "mod", "datapack"];
    }

    async searchPackages(packageType: string, query: string, packageFile: packageFile | null): Promise<string[]> {

        const facets = [
            [`project_type:${packageType}`],
            packageFile ? [`versions:${packageFile.loader.version}`] : []
        ].filter(facet => facet.length > 0);


        const params = new URLSearchParams([
            ["limit", "20"],
            ["query", query],
            ["facets", JSON.stringify(facets)]
        ]);

        const data = await fetch(`https://api.modrinth.com/v2/search?${params.toString()}`, {
            headers: {
                "User-Agent": "github.com/ValentinRapp/mspm"
            }
        })
            .then(res => res.json());

        return data.hits.map((hit: any) => hit.slug);
    }

    async addPackage(packageType: string, packageName: string, packageFile: packageFile): Promise<Package> {

        // console.log(packageFile)

        let request = await fetch(`https://api.modrinth.com/v2/project/${packageName}/version`, {
            headers: {
                "User-Agent": "github.com/ValentinRapp/mspm"
            }
        });

        if (!request.ok) {
            console.error("Package not found");
            process.exit(1);
        }

        const data = await request.json();

        const filteredData = data.filter((element: { game_versions: Array<string> }) => element.game_versions.includes(packageFile.loader.version));

        if (filteredData.length === 0) {
            console.error("No matching version was found");
            process.exit(1);
        }

        return {
            source: this.name,
            type: packageType,
            name: packageName,
            version: filteredData[0].version_number
        };
        
    }

}