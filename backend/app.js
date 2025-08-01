import express from "express";
import { supabase } from "./supabase_db.js";

const app = express();
const PORT = 4000;

app.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("creators").select();
    if (error) throw error;
    console.log(data);
    res.send(data);
  } catch (error) {
    res.status(500).send({ erorr: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
