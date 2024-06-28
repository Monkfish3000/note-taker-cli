import fs from "node:fs";
import http from "node:http";
import open from "open";

const interpolate = (html, data) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || "";
  });
};

const formatNotes = (notes) => {
  return notes
    .map((note) => {
      return `
        <div class='note'>
            <p${note.content}</p>
            <div class="tags">
            ${note.tag.map((tag) => `<span class='tag'>${tag}</span>`)}
            </div>
        </div>
        `;
    })
    .join("\n");
};

const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    const HTML_PATH = new URL("./template.html", import.meta.url).pathname;
    const template = await fs.readFile(HTML_PATH, "utf-8");
    const html = interpolate(template, { notes: formatNotes(notes) });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};

const start = (notes, port) => {
  const server = createServer(notes);
  server.listen(port, () => {
    const address = `http://localhost:${post}`;
    console.log(`Server is listening on ${address}`);
    open(address);
  });
};
