const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "the-rock-ai-assistant" is now active!');

    registerHelloWorldCommand(context);
    registerInputCommand(context);
    registerSidebarWebviewCommand(context);
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
                if (value) {
                    vscode.window.showInformationMessage(`Input received: ${value}`);
                }
            });
    });
    context.subscriptions.push(disposableInputCommand);
}

function registerSidebarWebviewCommand(context) {
    let disposableSidebarWebview = vscode.commands.registerCommand('the-rock-ai-assistant.sidebarWebview', () => {
        const panel = vscode.window.createWebviewPanel(
            'sidebarWebview', // Identifies the type of the webview. Used internally
            'Webview', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in.
            {} // Webview options.
        );

        panel.webview.html = getWebviewContent();
    });

    context.subscriptions.push(disposableSidebarWebview);
}

function getWebviewContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Webview</title>
    </head>
    <body>
        <h1>Hello from Webview!</h1>
    </body>
    </html>`;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
