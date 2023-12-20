const vscode = require('vscode');

function activate(context) {
    console.log('Congratulations, your extension "the-rock-ai-assistant" is now active!');

    registerHelloWorldCommand(context);
    registerInputCommand(context);
    registerSidebarWebviewProvider(context);
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

function registerSidebarWebviewProvider(context) {
    const provider = new SidebarWebviewProvider();
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            'theRockAiAssistant.sidebarWebview', // This ID should match the one in your package.json
            provider
        )
    );
}

class SidebarWebviewProvider {
    resolveWebviewView(webviewView) {
        webviewView.webview.options = {
            enableScripts: true
        };

        webviewView.webview.html = getWebviewContent();
    }
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
};
