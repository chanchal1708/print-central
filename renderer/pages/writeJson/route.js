import fs from "fs";
import path from "path";
import getProduction from "@/app/utils/production";

export async function POST(req) {
  try {
    const data = await req.json(); // Parse incoming JSON data
    console.log("filePathfilePathfilePath");
    return;

    const filePath = path.join(process.cwd(), "public", getProduction);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return new Response(
      JSON.stringify({ message: "JSON file written successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error writing JSON file" }), {
      status: 500,
    });
  }
}
