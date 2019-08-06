# recursively delete all .DS_Store files
find . -name '.DS_Store' -type f -delete

# upload prod files to s3

# index html
aws s3 cp index.html s3://timstoddard.me/index.html

# remove old built files before uploading new ones
aws s3 rm s3://timstoddard.me/dist --recursive
aws s3 cp dist s3://timstoddard.me/dist --recursive

# only upload new/modified media files
aws s3 sync media s3://timstoddard.me/media
