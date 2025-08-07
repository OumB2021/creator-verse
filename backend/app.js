import express from "express";
import cors from "cors";
import { supabase } from "./supabase_db.js";

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/creators", async (req, res) => {
  try {
    const { data, error } = await supabase.from("creators").select();
    if (error) {
      console.error("Supabase error fetching creators:", error);
      return res.status(502).send({ message: "Upstream data source error" });
    }
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch creators", erorr: error.message });
  }
});

app.post("/creators", async (req, res) => {
  try {
    const data = req.body;
    const { error } = await supabase.from("creators").insert(data);
    if (error) {
      console.error("Supabase error inserting creator:", error);
      return res.status(502).send({ message: "Upstream data source error" });
    }
    res
      .status(201)
      .json({ message: "Creator inserted successfully", data: data });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to insert creator", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
