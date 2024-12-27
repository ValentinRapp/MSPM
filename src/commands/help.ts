import { sources } from ".."

export const help = () => {
    console.log("Available sources:")
    console.log()
    console.log(sources.map(source => source.name))
    console.log()
    console.log("Available package types:")
    console.log()
    console.log(["plugin", "mod", "datapack"])
    console.log()
    console.log("Available commands:")
    console.log()
    console.log("init\t\t\t\t\tInitialize project")
    console.log("search [source] [package_type] [name]\tSearch package")
    console.log("add [source] [package_type] [name]\tAdd package to project")
    console.log("install\t\t\t\t\tInstall packages")
    console.log("install [source] [package_type] [name]\tInstall specific package")
    console.log("reinstall\t\t\t\tReinstall packages")
    console.log("remove [name]\t\t\t\tRemove package")
    console.log("udpate-app\t\t\t\tUpdate app")
    console.log("help\t\t\t\t\tShows this page")
}