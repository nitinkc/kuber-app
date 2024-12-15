# Add index
consider defining indexes in a `firestore.indexes.json` file to automate their creation during deployments.
```shell
firebase deploy --only firestore:indexes
```
           
# Deploy
**Locally**: The .env file loads environment variables into process.env during development.

**GitHub Actions**: Secrets are passed as environment variables into the build process,
ensuring the firebaseConfig is populated in the deployed build.

### 
```shell
rm -rf node_modules package-lock.json 
npm install
npm run build
firebase deploy 
```

### Deploy via github actions

Navigate to `Settings > Secrets and variables > Actions`.
[https://github.com/nitinkc/kuber-app/settings/secrets/actions](https://github.com/nitinkc/kuber-app/settings/secrets/actions)

Add Firebase environment variables as repository secrets:
```
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
REACT_APP_FIREBASE_MEASUREMENT_ID
```

GitHub Actions workflow injects these secrets during the build step:

```shell
-  run: |
          echo "REACT_APP_FIREBASE_API_KEY=${{ secrets.REACT_APP_FIREBASE_API_KEY }}" >> $GITHUB_ENV
          echo "REACT_APP_FIREBASE_AUTH_DOMAIN=${{ secrets.REACT_APP_FIREBASE_AUTH_DOMAIN }}" >> $GITHUB_ENV
          echo "REACT_APP_FIREBASE_PROJECT_ID=${{ secrets.REACT_APP_FIREBASE_PROJECT_ID }}" >> $GITHUB_ENV
          echo "REACT_APP_FIREBASE_STORAGE_BUCKET=${{ secrets.REACT_APP_FIREBASE_STORAGE_BUCKET }}" >> $GITHUB_ENV
          echo "REACT_APP_FIREBASE_MESSAGING_SENDER_ID=${{ secrets.REACT_APP_FIREBASE_MESSAGING_SENDER_ID }}" >> $GITHUB_ENV
          echo "REACT_APP_FIREBASE_APP_ID=${{ secrets.REACT_APP_FIREBASE_APP_ID }}" >> $GITHUB_ENV
          echo "REACT_APP_FIREBASE_MEASUREMENT_ID=${{ secrets.REACT_APP_FIREBASE_MEASUREMENT_ID }}" >> $GITHUB_ENV
```

