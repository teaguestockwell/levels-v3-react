# Levels

Aircraft cargo loading / weight and balance

## Compose fullstack app

This builds the ui, api, db, jwt proxy, and cypress imgs, then starts them up. The api will run migrations and seeds against the db, the ui will host the react build under the proxy that injects the jwt of John Snuffy, then cypress will start e2e testing. The build is served on http://localhost:8080

0. docker login registry.il2.dso.mil -u gitlab_ci_token -u $gitlab_token_string
1. git clone https://code.il2.dso.mil/tron/products/five-level-app/frontend-react.git
2. git clone https://code.il2.dso.mil/tron/products/five-level-app/api.git
3. cd frontend-react
4. npm run docker:build
5. npm run docker:up
6. npm run e2e

