# recursively delete all .DS_Store files
find . -name '.DS_Store' -type f -delete

# upload prod files to s3
aws s3 cp index.html s3://timstoddard.me/index.html
aws s3 cp dist s3://timstoddard.me/dist --recursive
aws s3 cp media s3://timstoddard.me/media --recursive
