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

app.get("/creators/:id", async (req, res) => {
  const id = await req.params.id;
  if (!id) {
    return res.status(400).send({ message: "Creator ID is required" });
  }
  try {
    const { data, error } = await supabase
      .from("creators")
      .select()
      .eq("id", id)
      .single();
    if (error) {
      console.error("Supabase error fetching creator by ID:", error);
      return res.status(502).send({ message: "Upstream data source error" });
    }
    if (!data) {
      return res.status(404).send({ message: "Creator not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch creator by ID", error: error.message });
  }
});

app.put("/creators/:id/edit", async (req, res) => {
  const { id } = req.params;
  const received = req.body;

  if (!id) {
    return res.status(400).send({ message: "Creator ID is required" });
  }

  console.log("values received", received);
});

app.delete("/creators/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: "Creator ID is required" });
  }

  try {
    const { data, error } = await supabase
      .from("creators")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error deleting user with ID:", error);
      return res.status(502).send({ message: "Upstream data source error" });
    }

    if (!data) {
      return res.status(404).send({ message: "Creator not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Failed to delete creator by ID",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
