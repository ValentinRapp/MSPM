import { unlinkSync } from "node:fs";
import { install } from "./install";

export const reinstall = () => {
    unlinkSync("mspm.cache");

    install([]);
}