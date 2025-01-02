# mspm - Minecraft Server Package Manager

Handle plugins, mods, datapacks, loaders, etc much like you would handle libraries in javascript using [npm](https://www.npmjs.com/)

## Requirements

- [Bun](https://bun.sh)

## Install

### Linux

```bash
curl -fsSL https://raw.githubusercontent.com/ValentinRapp/mspm/refs/heads/main/install.sh | bash
```

### Windows

- Clone repo somewhere on your computer and [build project](#build-project-from-source)
- Add ``[repo_location]/dist`` to your [PATH](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/)

> You can update the tool whenever you want by running ``git pull`` at the root of the repo and building it again

## Get Started

### Initializing a new minecraft server

```bash
mspm init
```
This prompts you a few options and setups a basic minecraft server using the loader you want *(Paper, Fabric, Vanilla, ...)*

You can then run the server by executing ``run.sh`` or ``run.bat`` depending on your platform

Take a look at what you can do with this tool using ``mspm help``

```bash
❯ mspm help
Available sources:

[ "Modrinth" ]

Available package types:

[ "plugin", "mod", "datapack" ]

Available commands:

| Command                                | Description              |
|----------------------------------------|--------------------------|
| init                                   | Initialize project       |
| search [source] [package_type] [name]  | Search package           |
| add [source] [package_type] [name]     | Add package to project   |
| install                                | Install packages         |
| install [source] [package_type] [name] | Install specific package |
| reinstall                              | Reinstall packages       |
| remove [name]                          | Remove package           |
| udpate-app                             | Update app               |
| help                                   | Shows this page          |
```

### Let's install a few packages

Let's say you'd want to install the ``EssentialsX`` plugin (specifically from modrinth), the way you'd do that would be first to search the plugin on modrinth to find its ID:

```bash
❯ mspm search modrinth plugin EssentialsX

essentialsx
essxselectors
bookshelves
tparequestgui
journeyessentials
```

> If the project you're in is in an incompatible version with the plugin you want, it won't show up

Once you've found it, you can add it to your project using ``mspm add modrinth plugin essentialsx``

your ``mspm.json`` file should now look something like this:

```json
{
    "loader": {
        "name": "Paper",
        "version": "1.20.1",
        "build": 196
    },
    "packages": [
        {
            "source": "Modrinth",
            "type": "plugin",
            "name": "essentialsx",
            "version": "2.20.1"
        }
    ]
}
```

Now finally, you just have to install all of the packages

```bash
❯ mspm install

Installing essentialsx...
Installing Paper...
essentialsx installed succesfully ✅
Paper installed successfully ✅
```

## Build project from source

```bash
bun install
bun run build
```

