import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  insertDB.mockClear(), getDB.mockClear(), saveDB.mockClear();
});

test("new note - inserts data and returns it", async () => {
  const note = {
    content: "this is my test note",
    id: 1,
    tags: ["test-tag"],
  };

  insertDB.mockResolvedValue(note);

  const result = await newNote(note.content, note.tags);

  expect(result.content).toEqual(note.content);
  expect(result.tags).toEqual(note.tags);
});
