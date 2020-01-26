# MapWorld

<!-- depthFrom=1 depthTo=6 orderedList=false -->

- [Introduction](#Introduction)
- [Initialize Develop Environments](#Initialize-Develop-Environments)
  - [Preparation](#Preparation)
    - [Mandatory](#Mandatory)
    - [Strongly Recommendation](#Strongly-Recommendation)
  - [Dependencies](#Dependencies)
  - [Initialize VSCode](#Initialize-VSCode)
  - [Push your code](#Push-your-code)

<!-- /TOC -->

## Introduction

WIP

## Initialize Develop Environments

### Preparation

#### Mandatory

- [node.js](https://github.com/nodejs/Release) 12.14 or later，or install [nvm](https://github.com/nvm-sh/nvm#install--update-script), toggle [automatically call nvm use](https://github.com/nvm-sh/nvm#automatically-call-nvm-use)
- [yarn](https://yarnpkg.com/lang/en/) 1.21 or later

#### Strongly Recommendation

- [VSCode](https://code.visualstudio.com/) (Although use other editors, VSCode is needed to consist team collaboration)
- [SourceTree](https://www.sourcetreeapp.com/) (Makes up for the editors' ability to view and compare version histories. Note that the first time you run it, you need to register a bitbucket account to activate the software)
- [iTerm2](https://www.iterm2.com/)
  - enable [Status Bar](https://www.iterm2.com/documentation-status-bar.html)
  - [iTerm Color Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)
- [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)
  - [spaceship](https://denysdovhan.com/spaceship-prompt/)
  - [Powerline fonts](https://github.com/powerline/fonts)
  - [zsh-better-npm-completion](https://github.com/lukechilds/zsh-better-npm-completion)
- [Fira Code](https://github.com/tonsky/FiraCode) / [Hack](https://github.com/source-foundry/Hack)

### Dependencies

After cloned this project, you need to execute the following command, which would install all the dependencies and be initialized.

```bash
# run at root of this project
yarn setup
```

### Initialize VSCode

Then you should see a pop-up message box, it is suggested that some VSCode plug-in installation (you can enter the plugins panel from the left side of the toolbar, the points in the upper right corner to select "Show Recommended Extensions" to install the plugins), in the "Workspace Recommendations" in the title bar, click "Install All Workspace Recommended Extensions", confirm each plugin is the enable state, restart VSCode

### Confirm Development Environments

If these steps in front of the right to carry out, open any JS or TS file, ESLint should be displayed lower right corner (no warning icon), the PROBLEMS panel will display the current open file error and warning information, write some inconsistent layout code and save automatically generating code in conformity with the specification (and sometimes need to save many times to complete automatic repair all code)

### Push your code

[SourceTree](https://www.sourcetreeapp.com/) must be installed, before committing your code, you should review your code first, compare the current state with the last steady state in history in SourceTree (such as latest master status), make sure all of changes in the commits are your expectations

### Commit Message

All commit messages conform to [Conventional Commits Specification](https://www.conventionalcommits.org/)（[type](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum)）

Run the following command, and follow the tips to finish commit:

```bash
yarn cz
```

### Others

The VSCode settings is common to all project developers and has a higher priority than individual settings and cannot be modified
