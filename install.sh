#!/bin/bash

path=$(pwd)
cd ~
echo "Cloning repo"
git clone https://github.com/ValentinRapp/mspm.git > /dev/null
cd mspm
echo "Building"
bun install > /dev/null
bun run build > /dev/null
echo "Installing"
sudo mv dist/mspm /usr/local/bin
echo "Deleting temp files"
cd ..
rm -rf mspm > /dev/null
echo "mspm installed ✅"
cd ${path}