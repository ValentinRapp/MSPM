import { loaders } from "../index";
import type { packageFile } from "../types";

const downloadLoader = async (data: packageFile) => {
    const loader = loaders.find(loader => loader.name === data.loader.name);
    if (!loader) {
        console.error(`Loader ${data.loader.name} not found`);
        process.exit(1);
    }

    try {
        const file = await loader.executeDowwnloadLoader(data.loader.version, data.loader.build);
        Bun.write(`server.jar`, file);
        console.log(`${data.loader.name} downloaded successfully`);
    } catch (e) {
        console.error("An error occurred while downloading the loader:", e);
        process.exit(1);
    }
}

export const install = async () => {
    let data: packageFile;
    let cache: packageFile | null;

    try {
        data = await Bun.file('mspm.json').json();
    } catch (e) {
        console.error("No project configured, use 'mspm init'");
        process.exit(1);
    }
    try {
        cache = JSON.parse(Buffer.from(await Bun.file('mspm.cache').text(), 'base64').toString());
    } catch (e) {
        cache = null;
    }

    if (!Bun.deepEquals(data.loader, cache?.loader)) {
        downloadLoader(data);
    }

    Bun.write('mspm.cache', Buffer.from(JSON.stringify(data)).toString('base64'));

}
