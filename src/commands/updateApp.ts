import { $ } from "bun";

export const updateApp = async () => {
    if (process.platform === "win32") {
        console.error("Not yet implemented, sorry :(");
        process.exit(1);
    } else {
        await $`curl -fsSL https://raw.githubusercontent.com/ValentinRapp/mspm/refs/heads/main/install.sh | bash`
    }
}