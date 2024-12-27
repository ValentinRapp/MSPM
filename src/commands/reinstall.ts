import { unlinkSync } from "node:fs";
import { install } from "./install";

export const reinstall = () => {
    unlinkSync("mspm.cache");
    unlinkSync("server.jar");

    install([]);
}