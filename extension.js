const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "the-rock-ai-assistant" is now active!');

    registerHelloWorldCommand(context);
    registerInputCommand(context);
}

function registerHelloWorldCommand(context) {
    let disposableHelloWorld = vscode.commands.registerCommand('the-rock-ai-assistant.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from The Rock AI Assistant!');
    });
    context.subscriptions.push(disposableHelloWorld);
}

function registerInputCommand(context) {
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
