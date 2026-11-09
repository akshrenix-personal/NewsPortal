# News Portal (MERN)

A news website where visitors read approved news, registered users post news (image/video), and an admin approves/deletes posts and reads contact messages.

**Stack:** MongoDB + Mongoose, Express 5, React 19 (Vite), Node.js, Bootstrap 5, JWT + bcrypt.

## Run locally
```bash
npm run install:all
cp Backend/.env.example Backend/.env      # set JWT_SECRET (and MONGO_URI if not local)
npm run seed:admin                        # creates the admin login from .env
npm run dev:backend                       # terminal 1  -> http://localhost:9000
npm run dev:frontend                      # terminal 2  -> http://localhost:5173
```

## Deploy (one service: Express serves API + built React)
1. Create a free MongoDB Atlas cluster, copy its connection string.
2. Push this folder to GitHub.
3. **Render / Railway (Node):**
   - Build command: `npm run install:all && npm run build`
   - Start command: `npm start`
   - Env vars: `NODE_ENV=production`, `MONGO_URI=<atlas string>`, `JWT_SECRET=<long random>`
4. Open the Render shell once and run `npm run seed:admin` (set `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars first).

**Docker:** create `.env` with `JWT_SECRET=...`, then `docker compose up --build`, then
`docker compose exec app npm run seed:admin`.

> Uploaded profile images live in `Backend/uploads`; on hosts with ephemeral disks use a persistent volume (Docker compose already does).

## API (all under `/api`)
| Access | Endpoints |
|---|---|
| Public | `POST user-register`, `POST login`, `GET all-approved-news`, `GET top-ten-news`, `GET top-category`, `GET top-city`, `GET top-video`, `POST add-contact-us` |
| Logged-in user | `PUT user-update`, `POST add-news`, `GET user-your-news` |
| Admin only | `GET admin-all-list`, `PUT admin-news-approved`, `POST delete-news`, `GET get-contact-us` |

## Production checklist
- [x] Secrets in env vars, app refuses to start without a strong `JWT_SECRET` in production
- [x] bcrypt password hashing, JWT auth, role-based admin routes
- [x] NoSQL-injection sanitising, input validation, URL scheme check (blocks `javascript:` links)
- [x] Helmet headers, rate limiting, upload type/size limits, CORS allow-list
- [x] Health check, request logging, graceful shutdown, global error handler
- [x] Dockerfile + compose, CI workflow, frontend error boundary and code-splitting

## Known limitations (good to mention in viva as "future work")
- Login token is kept in `localStorage`; httpOnly cookies would be safer against XSS.
- Uploaded images are stored on local disk; use S3/Cloudinary for multi-server scaling.
- No pagination on news lists, no email verification / password reset, no automated API tests beyond a sanitiser unit test.
