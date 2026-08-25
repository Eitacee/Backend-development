# Experiment 12 B Optional — Using Node.js to Manage Sessions & Cookies

Code reproduced from the uploaded lecture material.

## Install

```bash
npm init -y
npm install express express-session cookie-parser
```

## Main demonstration

Run:

```bash
node server.js
```

Open:

- http://localhost:3000/
- Log in with a username.
- Use `/logout` to destroy the session.

## Separate examples

Session example:

```bash
node Source/session-example.js
```

Cookie example:

```bash
node Source/cookie-example.js
```

The lecture demonstrates session management with `express-session` and cookie management with `cookie-parser`.
