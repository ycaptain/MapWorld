const { fs } = window;

export async function loadImg(filePath: string) {
  const img = await fs.promises.readFile(filePath);
  const blob = new Blob([img.buffer], { type: 'application/octet-stream' });
  return URL.createObjectURL(blob);
}
