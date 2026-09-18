require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const connectDB = require("./app/config/dbConfig");
const apiRoutes = require("./routes");
const { attachSocket } = require("./app/service/integrations");
const { createServer } = require("http");
const app = express();
connectDB();
app.use(helmet());
app.use(
  cors({
    origin: [
      "https://homeserve-plus-frontend.vercel.app",
      "http://localhost:5000",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));
app.use("/api", apiRoutes);
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, name: "HomeServe+ API" }),
);
app.use((err, _req, res, _next) =>
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" }),
);
const server = createServer(app);
attachSocket(server, process.env.CLIENT_URL || "http://localhost:3000");
server.listen(process.env.PORT || 5000, () =>
  console.log(`HomeServe+ API running on ${process.env.PORT || 5000}`),
);
