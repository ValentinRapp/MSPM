import { Loader } from './Loader';

export class Vanilla extends Loader {
    async getLatestVersion(): Promise<string> {
        return fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json")
            .then(res => res.json())
            .then(data => data.latest.release);
    }

    async getLatestBuild(version: string): Promise<string> {
        return "";
    }

    async versionExists(version: string): Promise<boolean> {
        return fetch(`https://launchermeta.mojang.com/mc/game/version_manifest.json`)
            .then(res => res.json())
            .then(data => data.versions.some((v: { id: string }) => v.id === version));
    }

    async downloadLoader(version: string, build: string): Promise<Blob> {
        return fetch(`https://launchermeta.mojang.com/mc/game/version_manifest.json`)
            .then(res => res.json())
            .then(data => data.versions.find((v: { id: string }) => v.id === version))
            .then((v: { url: string }) => fetch(v.url))
            .then(res => res.json())
            .then((data: { downloads: { server: { url: string } } }) => fetch(data.downloads.server.url))
            .then(res => res.blob());
    }

    get name(): string {
        return "Vanilla";
    }
}