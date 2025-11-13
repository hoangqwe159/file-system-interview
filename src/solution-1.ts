/**
 * Trie node structure for representing file system hierarchy
 */
interface TrieNode {
    name: string;                           // File name (only used for files)
    isFile: boolean;                        // Flag to indicate if this node represents a file
    content: string;                        // File content (only used for files)
    children: Map<string, TrieNode>;       // Map of child directories/files
}

function createTrieNode(): TrieNode {
    return {
        name: '',
        isFile: false,
        content: '',
        children: new Map<string, TrieNode>()
    };
}

function insertPath(root: TrieNode, path: string, isFile: boolean): TrieNode {
    let currentNode = root;
    const pathComponents = path.split('/');
    for (let i = 1; i < pathComponents.length; i++) {
        const component = pathComponents[i];
        if (!component) continue; // skip empty components
        if (!currentNode.children.has(component)) {
            currentNode.children.set(component, createTrieNode());
        }
        currentNode = currentNode.children.get(component)!;
    }
    currentNode.isFile = isFile;
    if (isFile) {
        const fileName = pathComponents[pathComponents.length - 1] || '';
        currentNode.name = fileName;
    }
    return currentNode;
}

function searchPath(root: TrieNode, path: string): TrieNode | null {
    let currentNode = root;
    const pathComponents = path.split('/');
    if (path === '/') {
        return root;
    }
    for (let i = 1; i < pathComponents.length; i++) {
        const component = pathComponents[i];
        if (!component) continue; // skip empty components
        if (!currentNode.children.has(component)) {
            return null;
        }
        currentNode = currentNode.children.get(component)!;
    }
    return currentNode;
}

export class FileSystem {
    private root: TrieNode;

    constructor() {
        this.root = createTrieNode();
    }

    ls(path: string): string[] {
        const result: string[] = [];
        const targetNode = searchPath(this.root, path);
        if (targetNode === null) {
            return result;
        }
        if (targetNode.isFile) {
            result.push(targetNode.name);
            return result;
        }
        for (const childName of targetNode.children.keys()) {
            result.push(childName);
        }
        result.sort();
        return result;
    }

    mkdir(path: string): void {
        insertPath(this.root, path, false);
    }

    addContentToFile(filePath: string, content: string): void {
        const fileNode = insertPath(this.root, filePath, true);
        fileNode.content += content;
    }

    readContentFromFile(filePath: string): string {
        const fileNode = searchPath(this.root, filePath);
        return fileNode ? fileNode.content : '';
    }
}

/**
 * Your FileSystem object will be instantiated and called as such:
 * var obj = new FileSystem()
 * var param_1 = obj.ls(path)
 * obj.mkdir(path)
 * obj.addContentToFile(filePath,content)
 * var param_4 = obj.readContentFromFile(filePath)
 */