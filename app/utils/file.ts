const { fs } = window;

export async function loadImg(filePath: string) {
  const img = await fs.promises.readFile(filePath);
  const blob = new Blob([img.buffer], { type: 'application/octet-stream' });
  return URL.createObjectURL(blob);
}

const defaultFilters = [
  { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
];

export async function openFiles(filters = defaultFilters) {
  const { remote } = require('electron');
  const { filePaths } = await remote.dialog.showOpenDialog({
    title: '打开文件',
    buttonLabel: '打开',
    filters,
    properties: ['openFile', 'multiSelections'],
  });
  return filePaths;
}
