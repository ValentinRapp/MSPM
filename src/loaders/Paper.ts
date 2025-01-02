import { Loader } from "./Loader";

export class Paper extends Loader {
    async getLatestVersion(): Promise<string> {
        return fetch("https://api.papermc.io/v2/projects/paper")
            .then(res => res.json())
            .then(data => data.versions[data.versions.length - 1]);
    }

    async getLatestBuild(version: string): Promise<string> {
        return fetch(`https://api.papermc.io/v2/projects/paper/versions/${version}/builds`)
            .then(res => res.json())
            .then(data => data.builds[data.builds.length - 1].build);
    }

    async versionExists(version: string): Promise<boolean> {
        return fetch(`https://api.papermc.io/v2/projects/paper/versions/${version}`)
            .then(res => res.status === 200);
    }

    async downloadLoader(version: string, build: string): Promise<Blob> {
        if (!await fetch(`https://api.papermc.io/v2/projects/paper/versions/${version}/builds/${build}`).then(res => res.status === 200))
            throw new Error(`${this.name} build ${build} does not exist for version ${version}`);

        return fetch(`https://api.papermc.io/v2/projects/paper/versions/${version}/builds/${build}/downloads/paper-${version}-${build}.jar`)
            .then(res => res.blob());

    }

    get name(): string {
        return "Paper";
    }
}
