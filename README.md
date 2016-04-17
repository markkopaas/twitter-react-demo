# Twitter react isomorphic live-update demo

The project demonstrates:

1) twitter authentication
2) stateless server
4) server side rendering
5) live updates using socket.io
3) reflux for single-page-app state management
5) example of high-level automated test

Things to improve:
1) authentication should be completely decoupled, current solution of unencrypted cookies is not acceptable
2) unit tests

### Running demo

Set environment variables as illustrated in `env.sh.example`

Install dependencies
```
npm i
```

Assemble applications' javascript bundle
```
npm run build
```

Run tests
```
npm t
```

Start server
```
nodemon server.js
```

Start server
```
nodemon server.js
```
