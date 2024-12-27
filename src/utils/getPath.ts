export const getPath = (packageType: string): string => {
    const args = packageType.split(' ');

    if (args.length === 1) {
        switch (args[0]) {
            case 'plugin':
                return 'plugins';
            case 'mod':
                return 'mods';
            case 'datapack':
                return 'world/datapacks';
            default:
                console.error(`Unknown package type: ${args[0]}`);
                process.exit(1);
        }
    } else {
        return packageType.substring(packageType.indexOf(' ') + 1);
    }
}
