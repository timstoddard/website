dir=~/Downloads/node_modules-website

# install modules
npm i

# move node_modules to external directory
rm -rf $dir
mkdir -p $dir
mv node_modules $dir

# create symlink
ln -s $dir/node_modules
