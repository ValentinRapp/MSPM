import { sources } from "..";

export const add = async (args: string[]) => {
    if (args.length < 3) {
        console.error("Usage: 'mspm add [source] [packageType] [package]'");
        process.exit(1);
    }

    const source = sources.find(source => source.name.toLowerCase() === args[0]);
    if (!source) {
        console.error(`Source ${args[0]} doesn't exist`);
        process.exit(1);
    }

    if (!source.packageTypes.includes(args[1])) {
        console.error(`Invalid package type '${args[1]}', valid types for ${source.name} are: ${source.packageTypes.join(", ")}`);
        process.exit(1);
    }

    source.executeAddPackage(args[1], args[2]);
}