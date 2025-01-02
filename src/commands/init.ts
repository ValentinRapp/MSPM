import { loaders } from "../index";
import { askQuestion } from "../utils/askQuestion";
import { $ } from "bun";

export const init = async () => {
    console.log("Select loader:\n");
    loaders.forEach((loader, i) => {
        console.log(`${i + 1} - ${loader.name}`);
    });

    let loaderIndex: number | null = null;

    try {
        const input = await askQuestion("\nYour input: ");
        loaderIndex = parseInt(input) - 1;

        if (!loaders[loaderIndex]) {
            console.error(`Invalid loader choice`);
            process.exit(1);
        }

        const loader = loaders[loaderIndex];

        const lastVersion = await loader.executeGetLatestVersion();
        let version = await askQuestion(`Version (default: ${lastVersion}): `);
        if (!version) {
            version = lastVersion;
        }

        if (!await loader.versionExists(version)) {
            console.error(`Version ${version} does not exist on ${loader.name}`);
            process.exit(1);
        }

        const agreeToEula = await askQuestion("Agree to Minecraft EULA? (y/n): ");
        if (agreeToEula.toLowerCase() === 'y') {
            Bun.write('eula.txt', 'eula=true');
        }

        let MemoryAmount = await askQuestion(`Memory amount in GB (default: 4): `);
        if (!MemoryAmount) MemoryAmount = '4';

        if (isNaN(parseInt(MemoryAmount))) {
            console.error(`Invalid memory amount`);
            process.exit(1);
        }

        const lastBuild = await loader.getLatestBuild(version);

        Bun.write('mspm.json', JSON.stringify({ loader: { name: loader.name, version, build: lastBuild }, packages: [] }, null, 4));

        if (process.platform === 'win32') {
            Bun.write('run.bat', `java -Xmx${MemoryAmount}G -jar server.jar nogui`);
        } else {
            Bun.write('run.sh', `java -Xmx${MemoryAmount}G -jar server.jar nogui`);
            await $`chmod +x run.sh`;
        }

        console.log("Project configured successfully, use 'mspm install' next");

    } catch (err) {
        console.error("An error occurred:", err);
        process.exit(1);
    }
}