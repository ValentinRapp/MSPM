import { loaders, sources } from "../index";
import type { Package, packageFile, Loader } from "../types";
import { getPath } from "../utils/getPath";

const downloadLoader = async (data: Loader) => {
    const loader = loaders.find(loader => loader.name === data.name);
    if (!loader) {
        console.error(`Loader ${data.name} not found`);
        process.exit(1);
    }

    try {
        const file = await loader.executeDowwnloadLoader(data.version, data.build);
        Bun.write(`server.jar`, file);
        console.log(`${data.name} installed successfully ✅`);
    } catch (e) {
        console.error("An error occurred while downloading the loader:", e);
        process.exit(1);
    }
}

const installPackage = async (packageInfo: Package) => {

    console.log(`Installing ${packageInfo.name}...`)

    const source = sources.find(source => source.name.toLowerCase() === packageInfo.source.toLowerCase());
    if (!source) {
        console.error(`Source ${packageInfo.source} doesn't exist`);
        process.exit(1);
    }
    const path = getPath(packageInfo.type);
    const extension = ['plugin', 'mod'].includes(packageInfo.type) ? 'jar' : 'zip';

    const fileData = await source.downloadPackage(packageInfo);

    Bun.write(`${path}/${packageInfo.name}.${extension}`, fileData);

    console.log(`${packageInfo.name} installed succesfully ✅`);
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

    let mustDownloadLoader = false;

    if (!Bun.deepEquals(data.loader, cache?.loader)) {
        mustDownloadLoader = true
    }

    let packages = data.packages.filter(pkg =>
        !cache?.packages.some(element => Bun.deepEquals(element, pkg))
    );

    await Promise.all([...packages.map(pkg => installPackage(pkg)), mustDownloadLoader ? downloadLoader(data.loader) : () => {}]);

    Bun.write('mspm.cache', Buffer.from(JSON.stringify(data)).toString('base64'));

}
