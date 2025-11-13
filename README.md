# In-Memory File System

This project implements an in-memory file system as described in [LeetCode Problem 588](https://leetcode.com/problems/design-in-memory-file-system/).

## Problem Description

Design a data structure that simulates an in-memory file system.

### Features
- **`ls(path: string): string[]`**: Lists files and directories in lexicographic order.
- **`mkdir(path: string): void`**: Creates directories recursively.
- **`addContentToFile(filePath: string, content: string): void`**: Adds or appends content to a file.
- **`readContentFromFile(filePath: string): string`**: Reads content from a file.

### Example Usage
```typescript
const fileSystem = new FileSystem();
fileSystem.ls("/"); // []
fileSystem.mkdir("/a/b/c");
fileSystem.addContentToFile("/a/b/c/d", "hello");
fileSystem.ls("/"); // ["a"]
fileSystem.readContentFromFile("/a/b/c/d"); // "hello"
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