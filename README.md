# In-Memory File System

This project implements an in-memory file system

## Problem Description

Design a data structure that simulates an in-memory file system.

### FileSystem API

#### `FileSystem()`
Initializes the object of the system.

#### `ls(path: string): string[]`
- If `path` is a file path, returns a list containing only this file's name.
- If `path` is a directory path, returns the list of file and directory names in this directory.
- The answer is always in lexicographic order.
- If the path does not exist, returns an empty list.

#### `mkdir(path: string): void`
- Makes a new directory according to the given path.
- If the middle directories in the path do not exist, creates them as well.
- Does nothing if the directory already exists.

#### `addContentToFile(filePath: string, content: string): void`
- If `filePath` does not exist, creates that file containing the given content.
- If `filePath` already exists, appends the given content to the original content.
- Intermediate directories are created if they do not exist.

#### `readContentFromFile(filePath: string): string`
- Returns the content in the file at `filePath`.
- If the file does not exist, returns an empty string.

### Example Usage
```typescript
const fileSystem = new FileSystem();
fileSystem.ls("/"); // []
fileSystem.mkdir("/a/b/c");
fileSystem.addContentToFile("/a/b/c/d", "hello");
fileSystem.ls("/"); // ["a"]
fileSystem.ls("/a/b/c"); // ["d"]
fileSystem.readContentFromFile("/a/b/c/d"); // "hello"
fileSystem.addContentToFile("/a/b/c/d", " world");
fileSystem.readContentFromFile("/a/b/c/d"); // "hello world"
```

## Setup

### Prerequisites
- [Bun](https://bun.sh/) installed.

### Install Dependencies
```bash
bun install
```

### Run Tests
```bash
bun test
```

## File Structure
- `src/`: Contains the implementation.
- `tests/`: Contains test cases.

## License
MIT