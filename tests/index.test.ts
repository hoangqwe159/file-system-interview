import { describe, it, expect } from "bun:test";
import { FileSystem } from "../src/index";

describe("FileSystem", () => {
  it("should list files and directories in lexicographic order", () => {
    const fileSystem = new FileSystem();
    expect(fileSystem.ls("/")).toEqual([]);

    fileSystem.mkdir("/a/b/c");
    fileSystem.addContentToFile("/a/b/c/d", "hello");

    expect(fileSystem.ls("/")).toEqual(["a"]);
    expect(fileSystem.ls("/a/b/c")).toEqual(["d"]);
  });

  it("should create directories recursively", () => {
    const fileSystem = new FileSystem();
    fileSystem.mkdir("/x/y/z");
    expect(fileSystem.ls("/x/y")).toEqual(["z"]);
  });

  it("should add and append content to files", () => {
    const fileSystem = new FileSystem();
    fileSystem.addContentToFile("/file", "hello");
    fileSystem.addContentToFile("/file", " world");
    expect(fileSystem.readContentFromFile("/file")).toBe("hello world");
  });

  it("should read content from files", () => {
    const fileSystem = new FileSystem();
    fileSystem.addContentToFile("/test", "content");
    expect(fileSystem.readContentFromFile("/test")).toBe("content");
  });

  it("should handle ls on root and empty directories", () => {
    const fs = new FileSystem();
    expect(fs.ls("/")).toEqual([]);
    fs.mkdir("/empty");
    expect(fs.ls("/empty")).toEqual([]);
  });

  it("should handle deep nested directories and files", () => {
    const fs = new FileSystem();
    fs.mkdir("/a/b/c/d/e/f");
    fs.addContentToFile("/a/b/c/d/e/f/file.txt", "data");
    expect(fs.ls("/a/b/c/d/e/f")).toEqual(["file.txt"]);
    expect(fs.readContentFromFile("/a/b/c/d/e/f/file.txt")).toBe("data");
  });

  it("should overwrite file content only by appending", () => {
    const fs = new FileSystem();
    fs.addContentToFile("/overwrite.txt", "first");
    fs.addContentToFile("/overwrite.txt", "second");
    expect(fs.readContentFromFile("/overwrite.txt")).toBe("firstsecond");
  });

  it("should distinguish between files and directories with same name", () => {
    const fs = new FileSystem();
    fs.mkdir("/foo");
    fs.addContentToFile("/foo", "bar"); // turns /foo into a file
    expect(fs.ls("/foo")).toEqual(["foo"]); // should return file name
    expect(fs.readContentFromFile("/foo")).toBe("bar");
  });

  it("should return empty array for ls on non-existent path", () => {
    const fs = new FileSystem();
    expect(fs.ls("/doesnotexist")).toEqual([]);
  });

  it("should return empty string for reading non-existent file", () => {
    const fs = new FileSystem();
    expect(fs.readContentFromFile("/nope.txt")).toBe("");
  });

  it("should handle multiple files and directories lexicographically", () => {
    const fs = new FileSystem();
    fs.mkdir("/dir");
    fs.addContentToFile("/dir/z.txt", "z");
    fs.addContentToFile("/dir/a.txt", "a");
    fs.mkdir("/dir/bfolder");
    expect(fs.ls("/dir")).toEqual(["a.txt", "bfolder", "z.txt"]);
  });

  it("should handle file and directory with similar names", () => {
    const fs = new FileSystem();
    fs.mkdir("/abc");
    fs.addContentToFile("/abcd", "file");
    expect(fs.ls("/")).toEqual(["abc", "abcd"]);
    expect(fs.ls("/abc")).toEqual([]);
    expect(fs.readContentFromFile("/abcd")).toBe("file");
  });

  it("should handle mkdir on existing file path (should not throw)", () => {
    const fs = new FileSystem();
    fs.addContentToFile("/file", "data");
    expect(fs.readContentFromFile("/file")).toBe("data");
  });

  it("should handle addContentToFile on existing directory path (should turn it into a file)", () => {
    const fs = new FileSystem();
    fs.mkdir("/dir");
    fs.addContentToFile("/dir", "data");
    expect(fs.ls("/dir")).toEqual(["dir"]);
    expect(fs.readContentFromFile("/dir")).toBe("data");
  });
  it("should handle empty string path gracefully", () => {
    const fs = new FileSystem();
    expect(fs.ls("")).toEqual([]);
    expect(fs.readContentFromFile("")).toBe("");
    expect(() => fs.mkdir("")).not.toThrow();
    expect(() => fs.addContentToFile("", "data")).not.toThrow();
  });

  it("should allow repeated mkdir on same path without error", () => {
    const fs = new FileSystem();
    fs.mkdir("/repeat");
    expect(() => fs.mkdir("/repeat")).not.toThrow();
    expect(fs.ls("/")).toEqual(["repeat"]);
  });

  it("should handle file content with special characters", () => {
    const fs = new FileSystem();
    const special = "!@#$%^&*()_+-=\n\t";
    fs.addContentToFile("/special.txt", special);
    expect(fs.readContentFromFile("/special.txt")).toBe(special);
  });

  it("should handle very long paths and file names", () => {
    const fs = new FileSystem();
    const longPath = "/" + "a".repeat(100) + "/" + "b".repeat(100) + "/" + "c".repeat(100);
    fs.mkdir(longPath);
    fs.addContentToFile(longPath + "/file.txt", "longdata");
    expect(fs.ls(longPath)).toEqual(["file.txt"]);
    expect(fs.readContentFromFile(longPath + "/file.txt")).toBe("longdata");
  });

  it("should allow file in root directory", () => {
    const fs = new FileSystem();
    fs.addContentToFile("/rootfile.txt", "root");
    expect(fs.ls("/")).toContain("rootfile.txt");
    expect(fs.readContentFromFile("/rootfile.txt")).toBe("root");
  });

  it("should return file name when ls is called on file path", () => {
    const fs = new FileSystem();
    fs.addContentToFile("/justafile", "abc");
    expect(fs.ls("/justafile")).toEqual(["justafile"]);
  });
});