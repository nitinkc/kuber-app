

```bash
cd ~/Programming/kuber/kuber-app
rm -rf node_modules package-lock.json 
npm install
npm run build
firebase deploy 
```

# Add index

```shell
firebase deploy --only firestore:indexes
```
                                                                                                                        ─╯
