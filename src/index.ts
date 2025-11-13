export class FileSystem {
    constructor() {
    }

    ls(path: string): string[] {
        throw new Error("Method not implemented.");
    }

    mkdir(path: string): void {
        throw new Error("Method not implemented.");
    }

    addContentToFile(filePath: string, content: string): void {
        throw new Error("Method not implemented.");
    }

    readContentFromFile(filePath: string): string {
        throw new Error("Method not implemented.");
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