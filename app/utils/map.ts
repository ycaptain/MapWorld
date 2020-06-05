export async function loadMap() {
  const {
    readCoors,
    electron: { remote },
  } = window;
  const { filePaths } = await remote.dialog.showOpenDialog({
    title: "打开文件",
    buttonLabel: "打开",
    properties: ["openFile"],
  });
  if (filePaths.length) {
    const data = await readCoors(filePaths[0]);
    return data;
  }
  return null;
};
