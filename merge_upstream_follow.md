# Follow upgrade code

1. Fetch new tags from community
    
    ```git fetch upstream```
2. Push all new tags from upstream to origin
    
    ```git push --tags```

3. Checkout from release tag from tag community
    
    ```git checkout -b release-v2.0.1 2.1.0rc3```

    **Note**: Change to your tag

4. Push new branch from a picked tag to origin
    
    ```git push --set-upstream origin release-v2.0.1```

    **Note**: Change to your tag

5. Chery pick all commit by commit id
    
    ```git cherry-pick xxx```

    **Note**: Get commit hash id from list commit in github portal``

6. Push all commit to orgin
    
    ```git push```

7. Rebuid image:
    
    ```docker build -t vnm_superset:1.1.0 .```
    
    **Note**: Change 1.1.0 to your tag

8. Fix some bugs:
    - missing node module: add module to package.json