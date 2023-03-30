# Follow upgrade code

1. Fetch new tags from community
    git fetch upstream

2. Push all new tags from upstream to origin
    git push --tags

3. Checkout from release tag from tag community
    git checkout -b release-v2.0.1 2.1.0rc3

4. Push new branch from a picked tag to origin
    git push --set-upstream origin vnm.v.2.1

5. Chery pick all commit by commit id
    git cherry-pick xxx

    note: Get commit hash id from list commit in github portal

5.1 Push all commit to orgin
    git push

6. Rebuid image
    docker build -t vnm_superset:1.1.0 .

6.1 Fix some bugs:
    - missing node module: add module to package.json