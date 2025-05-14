export function downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

export async function downloadFileWithFileSystemAPI(content: string, defaultFilename: string, mimeType: string): Promise<void> {
    if ('showSaveFilePicker' in window) {
        const extension = mimeType.split('/')[1];
        const options = {
            suggestedName: defaultFilename,
            types: [
                {
                    description: `${extension.charAt(0).toUpperCase() + extension.slice(1)} File`,
                    accept: { [mimeType]: [`.${extension}`] },
                },
            ],
        };
        try {
            const fileHandle = await (window as any).showSaveFilePicker(options);
            const writable = await fileHandle.createWritable();
            await writable.write(new Blob([content], { type: mimeType }));
            await writable.close();
        } catch (error) {
            console.error('File save canceled or failed:', error);
        }
    } else {
        downloadFile(content, defaultFilename, mimeType);
    }
}