import { Paper } from "./loaders/Paper";
import { Vanilla } from "./loaders/Vanilla";
import { init } from "./commands/init";
import { install } from "./commands/install";
import { reinstall } from "./commands/reinstall";
import { Modrinth } from "./sources/Modrinth";
import { search } from "./commands/search";
import { add } from "./commands/add";

export const loaders = [
    new Paper(),
    new Vanilla()
];

export const sources = [
    new Modrinth()
];


(async () => {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error("No command provided");
        process.exit(1);
    }

    const command = args[0];

    if (command === "init") {
        await init();
    } else if (command === "install") {
        await install();
    } else if (command === "reinstall") {
        reinstall();
    } else if (command === "search") {
        await search(args.slice(1));
    } else if (command === "add") {
        await add(args.slice(1));
    } else {
        console.error("Invalid command");
        process.exit(1);
    }

})();
