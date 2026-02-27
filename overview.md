# Project Context and Bug Report

## 1. Codebase Context
This is a MERN stack application structured into `FRONTEND` and `BACKEND` directories. The application is a social feed clone styled with Neobrutalism.

### Backend Overview
- **Entry Points:** `server.js` starts the application on port 3000. `app.js` holds the Express configuration, middlewares (`cors`, `express.json()`), and routing logic.
- **Database:** MongoDB is used via `mongoose`. The connection logic resides in `src/database/db.js`.
- **Models:** `Post` model defined in `src/models/post.model.js` (Schema: `image`, `caption`).
- **Services:** `src/services/storage.service.js` integrates with ImageKit for image hosting via Base64 upload buffer.
- **Data Flow:**
  - `POST /create-post` -> Uses `multer(memoryStorage)` to get `req.file.buffer` -> Uploads to ImageKit -> Saves Image URL and Caption to MongoDB.
  - `GET /posts` -> Fetches all posts from MongoDB and returns them to the client.

### Frontend Overview
- **Tech Stack:** React (Vite), Tailwind CSS, React Router DOM, Axios, Lucide React icons.
- **Entry Point:** `main.jsx` and `App.jsx`, providing routing for Home (`/`) and CreatePost (`/create`). Theme contexts are also heavily utilized for the UI.
- **API Flow:** `src/services/api.js` handles requests (`fetchPosts` and `createPost`). It dynamically switches between a Vite proxy (`/api`) in development and a hardcoded Render URL for production.

---

## 2. Identified Bugs & Suggested Fixes

### 🔴 Backend Bugs

#### Bug 1: ImageKit Configuration Missing Keys
**Issue:** `src/services/storage.service.js` only provides the `privateKey`. The ImageKit Node SDK requires three keys: `publicKey`, `privateKey`, and `urlEndpoint`. Calling `new ImageKit()` without all three will fail uploads.
**Fix:** Update `storage.service.js` to include the missing fields from Environment variables:
```javascript
const imageKit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC,
  privateKey: process.env.IMAGE_KIT_PRIVATE,
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT
});
```

#### Bug 2: Missing Error Handling in Route (Unhandled Promise Rejections)
**Issue:** `src/app.js` handles the POST `/create-post` with async/await but lacks a `try/catch` block. If `uploadFile` or `postModel.create` throws an error, the server will crash or hang as the request won't return a response.
**Fix:** Wrap the logic in a `try/catch` block.
```javascript
app.post('/create-post', upload.single("image"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Image is required" });
        const result = await uploadFile(req.file.buffer);
        // ...
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
```

#### Bug 3: No validation for `req.file`
**Issue:** In `src/app.js`, `req.file.buffer` is accessed directly. If the request doesn't include the 'image' file, `req.file` will be undefined, triggering a `TypeError` and crashing the app.
**Fix:** Validate `if(!req.file)` before accessing the buffer.

#### Bug 4: Memory Storage Bomb (Multer)
**Issue:** `multer({ storage: multer.memoryStorage() })` does not have limits set. This makes the node application vulnerable to Out-Of-Memory (OOM) crashes if a user tries uploading massive video files.
**Fix:** Limit the upload size using `limits`.
```javascript
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
```

#### Bug 5: DB.js floating string
**Issue:** `src/database/db.js` has a floating `""` under the URI variable declaration. While arguably just a cosmetic ignored statement by Node js, it suggests missing fallback logic.
**Fix:** Clean it up: `const uri = process.env.MONGO_URI || "";`

---

### 🟡 Frontend Bugs

#### Bug 6: Vite Proxy config env access
**Issue:** `vite.config.js` uses `target: process.env.BACKEND_URL`. Vite does not automatically inject `.env` into `process.env` in `vite.config.js` without using `loadEnv()`. This causes `target` to be `undefined`, breaking CORS/proxy in the local dev server.
**Fix:** Use `loadEnv` to fetch `.env` configs, or explicitly define the port if working locally:
```javascript
import { defineConfig, loadEnv } from 'vite'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // ...
    proxy: { '/api': { target: env.BACKEND_URL || 'http://localhost:3000', ... } }
  }
})
```

#### Bug 7: Hardcoded Prod URL in API Service
**Issue:** `src/services/api.js` hardcodes the production URL `https://mern-project-fdh9.onrender.com` instead of relying on the environment.
**Fix:** Use `import.meta.env.VITE_BACKEND_URL` so you can easily shift dev/stg/prod environments from `.env` instead of modifying source code. Note that Env variable in `.env` needs the `VITE_` prefix.
