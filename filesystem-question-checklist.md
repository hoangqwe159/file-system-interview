# File System Design Interview Checklist

Use this checklist to evaluate an engineer's approach to solving the file system design/coding question (like the one in this repo).

## Problem Understanding
- [ ] Clarifies requirements and edge cases (e.g., file vs directory, path formats)
- [ ] Asks about constraints (performance, memory, error handling)
- [ ] Identifies expected behaviors for invalid paths, overwrites, etc.

## Design & Approach
- [ ] Chooses appropriate data structures (e.g., Trie, HashMap, custom classes)
- [ ] Explains reasoning for chosen structure
- [ ] Breaks down problem into logical components (ls, mkdir, addContentToFile, readContentFromFile)
- [ ] Handles directory and file distinction clearly
- [ ] Considers scalability and extensibility

## Implementation
- [ ] Writes clean, readable, and maintainable code
- [ ] Uses clear variable and method names
- [ ] Handles edge cases (empty path, non-existent path, file/directory overwrite)
- [ ] Avoids runtime errors (e.g., null/undefined checks)
- [ ] Follows language best practices (TypeScript/Java)

## Testing
- [ ] Provides comprehensive unit tests
- [ ] Covers edge cases (deep nesting, special characters, repeated operations)
- [ ] Validates expected output for all operations
- [ ] Tests error handling and invalid input

## Communication
- [ ] Explains solution and trade-offs clearly
- [ ] Justifies design and implementation choices
- [ ] Responds well to follow-up questions and suggestions

## Senior-Level Indicators
- [ ] Proposes optimizations or alternative designs
- [ ] Discusses time/space complexity
- [ ] Suggests improvements for production-readiness (thread safety, persistence, etc.)
- [ ] Mentors or guides others through the solution

## Constraints
- 1 <= path.length, filePath.length <= 100
- `path` and `filePath` are absolute paths which begin with '/' and do not end with '/' except that the path is just '/'.
- All directory names and file names only contain lowercase letters, and the same names will not exist in the same directory.
- All operations will be passed valid parameters; users will not attempt to retrieve file content or list a directory or file that does not exist.
- The parent directory for the file in `addContentToFile` will exist.
- 1 <= content.length <= 50
- At most 300 calls will be made to `ls`, `mkdir`, `addContentToFile`, and `readContentFromFile`.
---
_Use this checklist to guide your evaluation for this specific file system question. Mark each item and discuss examples for each._
