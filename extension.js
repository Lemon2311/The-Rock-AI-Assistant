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
            'theRockAiAssistant.sidebarWebview', // This ID should match the one in package.json
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
    
    const fs = require('fs');
    const path = require('path');

    const filePath = path.join(__dirname, 'sidebarWebview.html');

    try {
        // Read the file contents synchronously
        const content = fs.readFileSync(filePath, 'utf8');
        return content;
    } catch (err) {
        // Handle any errors during file reading
        console.error('Error reading the file:', err);
        return '';
    }//could be done better async
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
