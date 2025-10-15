require("dotenv").config();
const express = require("express");
const cors = require("cors");
const openaiRouter = require("./routes/openai");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: "https://https://ai-study-buddy-dun.vercel.app/"
})
);
app.use("/api/openai", openaiRouter);
app.use(express.json({ limit: "2mb" }));
app.get("/", (req, res) => res.send({ status: "OK" }));
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
