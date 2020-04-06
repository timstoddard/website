# https://www.dropboxforum.com/t5/Dropbox-files-folders/How-to-make-Dropbox-ignore-node-modules-folder-with-symbolic/m-p/388949

dir=~/node_modules_dropbox_hack/node_modules-website

# install modules
npm i

# move node_modules to external directory
rm -rf $dir
mkdir -p $dir
mv node_modules $dir

# create symlink
ln -s $dir/node_modules
