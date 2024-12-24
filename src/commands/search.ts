import { sources } from "..";

export const search = async (args: string[]) => {
    if (args.length < 3) {
        console.error("Usage: 'mspm search [source] [packageType] [query]'");
        process.exit(1);
    }

    const packageTypes = ["plugin", "mod", "datapack"];

    const source = sources.find(source => source.name.toLowerCase() === args[0]);
    if (!source) {
        console.error(`Source ${args[0]} doesn't exist`);
        process.exit(1);
    }

    if (!packageTypes.includes(args[1])) {
        console.error(`Invalid package type ${args[1]}`);
        process.exit(1);
    }

    source.executeSearchPackages(args[1], args[2]);
}