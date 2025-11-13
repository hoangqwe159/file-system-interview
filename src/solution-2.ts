class Dir {
    dirs: Map<string, Dir> = new Map();
    files: Map<string, string> = new Map();
}

export class FileSystem {
    private root: Dir;

    constructor() {
        this.root = new Dir();
    }

    ls(path: string): string[] {
        let currentDir = this.root;
        const result: string[] = [];
        if (path !== "/") {
            const pathParts = path.split("/").filter(Boolean);
            for (let i = 0; i < pathParts.length - 1; i++) {
                const dirName = pathParts[i] ?? "";
                if (!currentDir.dirs.has(dirName)) {
                    return [];
                }
                currentDir = currentDir.dirs.get(dirName)!;
            }
            const lastPart = pathParts[pathParts.length - 1] ?? "";
            if (currentDir.files.has(lastPart)) {
                result.push(lastPart);
                return result;
            } else {
                const dirName = lastPart ?? "";
                if (!currentDir.dirs.has(dirName)) {
                    return [];
                }
                currentDir = currentDir.dirs.get(dirName)!;
            }
        }
        result.push(...Array.from(currentDir.dirs.keys()));
        result.push(...Array.from(currentDir.files.keys()));
        result.sort();
        return result;
    }

    mkdir(path: string): void {
        let currentDir = this.root;
        const pathParts = path.split("/").filter(Boolean);
        for (let i = 0; i < pathParts.length; i++) {
            const dirName = pathParts[i] ?? "";
            if (!currentDir.dirs.has(dirName)) {
                currentDir.dirs.set(dirName, new Dir());
            }
            currentDir = currentDir.dirs.get(dirName)!;
        }
    }

    addContentToFile(filePath: string, content: string): void {
        let currentDir = this.root;
        const pathParts = filePath.split("/").filter(Boolean);
        for (let i = 0; i < pathParts.length - 1; i++) {
            const dirName = pathParts[i] ?? "";
            if (!currentDir.dirs.has(dirName)) {
                currentDir.dirs.set(dirName, new Dir());
            }
            currentDir = currentDir.dirs.get(dirName)!;
        }
        const fileName = pathParts[pathParts.length - 1] ?? "";
        currentDir.files.set(fileName, (currentDir.files.get(fileName) ?? "") + content);
    }

    readContentFromFile(filePath: string): string {
        let currentDir = this.root;
        const pathParts = filePath.split("/").filter(Boolean);
        for (let i = 0; i < pathParts.length - 1; i++) {
            const dirName = pathParts[i] ?? "";
            if (!currentDir.dirs.has(dirName)) {
                currentDir.dirs.set(dirName, new Dir());
            }
            currentDir = currentDir.dirs.get(dirName)!;
        }
        const fileName = pathParts[pathParts.length - 1] ?? "";
        return currentDir.files.get(fileName) ?? "";
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