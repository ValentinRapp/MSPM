echo "Cloning repo"
git clone https://github.com/ValentinRapp/mspm.git
cd mspm
echo "Building"
bun install
bun run build
echo "Installing"
sudo mv dist/mspm /usr/local/bin
echo "Deleting temp files"
cd ..
rm -rf mspm
echo "mspm installed ✅"