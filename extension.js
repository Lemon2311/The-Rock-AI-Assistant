const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "the-rock-ai-assistant" is now active!');

    // Create a simple tree data provider
    class HelloWorldProvider {
        getTreeItem(element) {
            return element;
        }

        getChildren() {
            return [new vscode.TreeItem("Hello World")];
        }
    }

    // Register the TreeDataProvider
    const helloWorldProvider = new HelloWorldProvider();
    vscode.window.registerTreeDataProvider('helloWorldView', helloWorldProvider);

    // Register the command
    let disposable = vscode.commands.registerCommand('the-rock-ai-assistant.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from The Rock AI Assistant!');
    });
    context.subscriptions.push(disposable);

    // Show the message when the view is visible
    vscode.commands.executeCommand('setContext', 'helloWorldViewVisible', true);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
