cd ..
git pull
yarn build
pm2 restart webdev-town
echo "DONE"