import type { NextApiRequest, NextApiResponse } from "next";
import { spawn } from "child_process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { company, year, report, statement } = req.body;

  const py = spawn("python3", [
    "lib/api/get_finstate.py",
    company,
    year,
    report,
    statement,
  ]);

  let data = "";
  py.stdout.on("data", (chunk) => {
    data += chunk;
  });
  py.stderr.on("data", (err) => {
    console.error(err.toString());
  });
  py.on("close", (code) => {
    if (code === 0) {
      try {
        res.status(200).json({ result: JSON.parse(data) });
      } catch (e) {
        res.status(200).json({ result: data });
      }
    } else {
      res.status(500).json({ error: "Python script error" });
    }
  });
}
