const vscode = require('vscode');

function activate(context) {
    // registerHelloWorldCommand(context);
    // registerInputCommand(context);
    registerReadSelectedTextCommand(context);
}

// Example of a simple response command
// function registerHelloWorldCommand(context) {
//     let disposableHelloWorld = vscode.commands.registerCommand('the-rock-ai-assistant.helloWorld', () => {
//         vscode.window.showInformationMessage('Hello World from The Rock AI Assistant!');
//     });
//     context.subscriptions.push(disposableHelloWorld);
// }

// function registerInputCommand(context) {
//     let disposableInputCommand = vscode.commands.registerCommand('the-rock-ai-assistant.inputCommand', () => {
//         vscode.window.showInputBox({ placeHolder: "Enter your input here" })
//             .then(value => {
//                 if (value) {
//                     vscode.window.showInformationMessage(`Input received: ${value}`);
//                 }
//             });
//     });
//     context.subscriptions.push(disposableInputCommand);
// }

function registerSidebarWebviewProvider(context,selectedText) {
    const provider = new SidebarWebviewProvider(selectedText);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            'theRockAiAssistant.sidebarWebview', // This ID should match the one in package.json
            provider
        )
    );
}

class SidebarWebviewProvider {

    constructor(selectedText) {
        this.selectedText = selectedText;
    }

    resolveWebviewView(webviewView) {
        webviewView.webview.options = {
            enableScripts: true
        };

        webviewView.webview.html = getWebviewContent(this.selectedText);
    }
}

function getWebviewContent(selectedText) {
    
    const fs = require('fs');
    const path = require('path');

    const filePath = path.join(__dirname, 'sidebarWebview.html');

    // try {
    //     // Read the file contents synchronously
    //     const content = fs.readFileSync(filePath, 'utf8');
    //     return content;
    // } catch (err) {
    //     // Handle any errors during file reading
    //     console.error('Error reading the file:', err);
    //     return '';
    // }//could be done better async

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Webview</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1>'${selectedText}'</h1>
      
    </body>
    </html>`;
    
}

function registerReadSelectedTextCommand(context) {
    let disposableReadSelectedText = vscode.commands.registerCommand('the-rock-ai-assistant.readSelectedText', () => {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let selectedText = editor.document.getText(editor.selection);
            if (selectedText) {
                registerSidebarWebviewProvider(context, selectedText);
                vscode.window.showInformationMessage(`Selected Text: ${selectedText}`);
            } else {
                vscode.window.showInformationMessage('No text selected.');
            }
        } else {
            vscode.window.showInformationMessage('No active editor.');
        }
    });
    context.subscriptions.push(disposableReadSelectedText);
}

function deactivate() {}


module.exports = {
    activate,
    deactivate
};
