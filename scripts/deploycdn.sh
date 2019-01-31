# Install blobxfer
curl -L -o ~/blobxfer https://github.com/Azure/blobxfer/releases/download/1.2.1/blobxfer-1.2.1-linux-x86_64
chmod +x ~/blobxfer

# PACKAGE_NAME=$(node -p require\(\'$TRAVIS_BUILD_DIR/package.json\'\).name)
PACKAGE_NAME=botframework-webchat
PACKAGE_VERSION=$(node -p require\(\'$TRAVIS_BUILD_DIR/package.json\'\).version)
echo Will publish to CDN at $PACKAGE_NAME/$PACKAGE_VERSION/*

# Copy files that should be distributed to CDN
mkdir $TRAVIS_BUILD_DIR/dist

cp $TRAVIS_BUILD_DIR/adaptivecards-hostconfig.json $TRAVIS_BUILD_DIR/dist
cp $TRAVIS_BUILD_DIR/botchat-fullwindow.css $TRAVIS_BUILD_DIR/dist
cp $TRAVIS_BUILD_DIR/botchat.css $TRAVIS_BUILD_DIR/dist
cp $TRAVIS_BUILD_DIR/botchat.js $TRAVIS_BUILD_DIR/dist
cp $TRAVIS_BUILD_DIR/CognitiveServices.js $TRAVIS_BUILD_DIR/dist

# Upload to based on version from package.json
~/blobxfer upload --local-path $TRAVIS_BUILD_DIR/dist --remote-path $PACKAGE_NAME/$PACKAGE_VERSION --storage-account $CDN_BLOB_ACCOUNT --storage-account-key $CDN_BLOB_KEY

# If on "ibiza" branch, deploy to "ibiza" tag too
if [ "$TRAVIS_BRANCH" = "ibiza" ]
then
# Upload to /ibiza/
~/blobxfer upload --local-path $TRAVIS_BUILD_DIR/dist --remote-path $PACKAGE_NAME/ibiza --storage-account $CDN_BLOB_ACCOUNT --storage-account-key $CDN_BLOB_KEY
fi
