import type { packageFile } from "../types";
import { Source } from "./Source";

export class Modrinth extends Source {
    get name() {
        return "Modrinth";
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
}