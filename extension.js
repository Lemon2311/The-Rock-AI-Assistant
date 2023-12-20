const vscode = require('vscode');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "the-rock-ai-assistant" is now active!');

    // Register the 'helloWorld' command
    let disposableHelloWorld = vscode.commands.registerCommand('the-rock-ai-assistant.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from The Rock AI Assistant!');
    });
    context.subscriptions.push(disposableHelloWorld);

    // Create a simple tree data provider
    class IconProvider {
        getTreeItem(element) {
            return element;
        }

        getChildren() {
            // Creating a TreeItem with an icon
            const iconPath = path.join(__filename, '..', '..', 'media', 'icon.svg');
            const treeItem = new vscode.TreeItem("Icon Item");
            treeItem.iconPath = {
                light: vscode.Uri.file(iconPath),
                dark: vscode.Uri.file(iconPath)
            };
            return [treeItem];
        }
    }

    // Register the TreeDataProvider
    const iconProvider = new IconProvider();
    vscode.window.registerTreeDataProvider('iconView', iconProvider);

    // Create a status bar item
    let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = 'the-rock-ai-assistant.inputCommand';
    statusBarItem.text = "$(keyboard) Add Input";
    statusBarItem.tooltip = "Click to add input";
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Register the 'inputCommand' command
    let disposableInputCommand = vscode.commands.registerCommand('the-rock-ai-assistant.inputCommand', () => {
        vscode.window.showInputBox({ placeHolder: "Enter your input here" })
            .then(value => {
                // Handle the input value
                if (value) {
                    vscode.window.showInformationMessage(`Input received: ${value}`);
                }
            });
    });
    context.subscriptions.push(disposableInputCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
