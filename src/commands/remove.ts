import type { packageFile } from "../types";
import { getPath } from "../utils/getPath";
import { unlink } from "node:fs/promises";

export const remove = async (args: string[]) => {

    let pkg = args[0]

    let data: packageFile;

    try {
        data = await Bun.file('mspm.json').json();
    } catch (e) {
        console.error("No project configured, use 'mspm init'");
        process.exit(1);
    }

    const extension = ['plugin', 'mod'].includes(data.packages.find(element => element.name === pkg)?.type.split(' ')[0] || '') ? 'jar' : 'zip';

    const path = data.packages
        .map(element => ({ name: element.name, path: `${getPath(element.type)}/${element.name}.${extension}` }))
        .find(element => element.name === pkg)
        ?.path;

    if (!path) {
        console.error("Package was not found");
        process.exit(1);
    }
    data = { ...data, packages: data.packages.filter(element => element.name !== pkg)};

    const deleteFile = async (path: string) => {
        try {
            await unlink(path);
        } catch (e) {}
    }

    await Promise.all([
        deleteFile(path),
        Bun.write('mspm.json', JSON.stringify(data, null, 4)),
        Bun.write('mspm.cache', Buffer.from(JSON.stringify(data)).toString('base64'))    
    ]);

    console.log(`Package ${pkg} removed succesfully ✅`)

}