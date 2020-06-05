const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

let menu;
let template;
let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const installExtensions = () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer');
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
      extensions.map(name => installer.default(installer[name]))
    ).catch(console.log);
  }

  return Promise.resolve([]);
};

app.on('ready', () =>
  installExtensions().then(() => {
    mainWindow = new BrowserWindow({
      show: false,
      frame: false,
      titleBarStyle: 'hiddenInset',
      width: 1400,
      height: 920,
      minWidth: 1400,
      minHeight: 920,
      webPreferences: {
        nodeIntegration: true,
        preload: path.resolve(__dirname, 'preload'),
      },
    });

    mainWindow.loadURL(
      `file://${path.resolve(__dirname, '../public/app.html')}`
    );

    require('./ipc').initialize(mainWindow);

    mainWindow.webContents.on('did-finish-load', async () => {
      mainWindow.show();
      mainWindow.focus();
      await installExtensions();
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    if (process.env.NODE_ENV === 'development') {
      mainWindow.openDevTools();
      mainWindow.webContents.on('context-menu', (e, props) => {
        const { x, y } = props;

        Menu.buildFromTemplate([
          {
            label: 'Inspect element',
            click() {
              mainWindow.inspectElement(x, y);
            },
          },
        ]).popup(mainWindow);
      });
    }

    if (process.platform === 'darwin') {
      template = [
        {
          label: 'MapWorld',
          submenu: [
            {
              label: 'About MapWorld',
              selector: 'orderFrontStandardAboutPanel:',
            },
            {
              type: 'separator',
            },
            {
              label: 'Services',
              submenu: [],
            },
            {
              type: 'separator',
            },
            {
              label: 'Hide MapWorld',
              accelerator: 'Command+H',
              selector: 'hide:',
            },
            {
              label: 'Hide Others',
              accelerator: 'Command+Shift+H',
              selector: 'hideOtherApplications:',
            },
            {
              label: 'Show All',
              selector: 'unhideAllApplications:',
            },
            {
              type: 'separator',
            },
            {
              label: 'Quit',
              accelerator: 'Command+Q',
              click() {
                app.quit();
              },
            },
          ],
        },
        {
          label: 'Edit',
          submenu: [
            {
              label: 'Undo',
              accelerator: 'Command+Z',
              selector: 'undo:',
            },
            {
              label: 'Redo',
              accelerator: 'Shift+Command+Z',
              selector: 'redo:',
            },
            {
              type: 'separator',
            },
            {
              label: 'Cut',
              accelerator: 'Command+X',
              selector: 'cut:',
            },
            {
              label: 'Copy',
              accelerator: 'Command+C',
              selector: 'copy:',
            },
            {
              label: 'Paste',
              accelerator: 'Command+V',
              selector: 'paste:',
            },
            {
              label: 'Select All',
              accelerator: 'Command+A',
              selector: 'selectAll:',
            },
          ],
        },
        {
          label: 'View',
          submenu:
            process.env.NODE_ENV === 'development'
              ? [
                  {
                    label: 'Reload',
                    accelerator: 'Command+R',
                    click() {
                      mainWindow.webContents.reload();
                    },
                  },
                  {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click() {
                      mainWindow.setFullScreen(!mainWindow.isFullScreen());
                    },
                  },
                  {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Alt+Command+I',
                    click() {
                      mainWindow.toggleDevTools();
                    },
                  },
                ]
              : [
                  {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click() {
                      mainWindow.setFullScreen(!mainWindow.isFullScreen());
                    },
                  },
                  {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Alt+Command+I',
                    click() {
                      mainWindow.toggleDevTools();
                    },
                  },
                ],
        },
        {
          label: 'Window',
          submenu: [
            {
              label: 'Minimize',
              accelerator: 'Command+M',
              selector: 'performMiniaturize:',
            },
            {
              label: 'Close',
              accelerator: 'Command+W',
              selector: 'performClose:',
            },
            {
              type: 'separator',
            },
            {
              label: 'Bring All to Front',
              selector: 'arrangeInFront:',
            },
          ],
        },
        {
          label: 'Help',
          submenu: [
            {
              label: 'Documentation',
              click() {
                shell.openExternal(
                  'https://github.com/YCaptain/MapWorld/tree/master#readme'
                );
              },
            },
            {
              label: 'Search Issues',
              click() {
                shell.openExternal(
                  'https://github.com/YCaptain/MapWorld/issues'
                );
              },
            },
          ],
        },
      ];

      menu = Menu.buildFromTemplate(template);
      Menu.setApplicationMenu(menu);
    } else {
      template = [
        {
          label: '&File',
          submenu: [
            {
              label: '&Open',
              accelerator: 'Ctrl+O',
            },
            {
              label: '&Close',
              accelerator: 'Ctrl+W',
              click() {
                mainWindow.close();
              },
            },
          ],
        },
        {
          label: '&View',
          submenu:
            process.env.NODE_ENV === 'development'
              ? [
                  {
                    label: '&Reload',
                    accelerator: 'Ctrl+R',
                    click() {
                      mainWindow.webContents.reload();
                    },
                  },
                  {
                    label: 'Toggle &Full Screen',
                    accelerator: 'F11',
                    click() {
                      mainWindow.setFullScreen(!mainWindow.isFullScreen());
                    },
                  },
                  {
                    label: 'Toggle &Developer Tools',
                    accelerator: 'Alt+Ctrl+I',
                    click() {
                      mainWindow.toggleDevTools();
                    },
                  },
                ]
              : [
                  {
                    label: 'Toggle &Full Screen',
                    accelerator: 'F11',
                    click() {
                      mainWindow.setFullScreen(!mainWindow.isFullScreen());
                    },
                  },
                  {
                    label: 'Toggle &Developer Tools',
                    accelerator: 'Alt+Ctrl+I',
                    click() {
                      mainWindow.toggleDevTools();
                    },
                  },
                ],
        },
        {
          label: 'Help',
          submenu: [
            {
              label: 'Documentation',
              click() {
                shell.openExternal(
                  'https://github.com/YCaptain/MapWorld/tree/master#readme'
                );
              },
            },
            {
              label: 'Search Issues',
              click() {
                shell.openExternal(
                  'https://github.com/YCaptain/MapWorld/issues'
                );
              },
            },
          ],
        },
      ];
      menu = Menu.buildFromTemplate(template);
      mainWindow.setMenu(menu);
    }
  })
);

module.exports = { mainWindow };
