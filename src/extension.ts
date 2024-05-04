import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "express-ts-generator" is now active!'
  );

  let disposable = vscode.commands.registerCommand(
    "express-ts-generator.generate",
    async () => {
      try {
        const projectName = await vscode.window.showInputBox({
          prompt: "Enter project name",
          placeHolder: "ProjectName",
        });
        if (!projectName) {
          vscode.window.showErrorMessage("Project name is required");
          return;
        }
        const cloneUrl = "https://github.com/vishnucprasad/express_ts.git";
        const projectPath = path.join("./", projectName);

        // Create a new terminal
        const terminal = vscode.window.createTerminal("Express TS Generator");

        // Execute git clone command in the terminal
        terminal.sendText(`git clone ${cloneUrl} ${projectPath}`);
        terminal.sendText("git checkout base_api");
        terminal.sendText(`cd ${projectPath}`);
        terminal.sendText("rm -rf .git");
        terminal.sendText("git init");
        terminal.sendText("pnpm install");

        // Display success message
        vscode.window.showInformationMessage(
          "Express TS project created successfully!"
        );
      } catch (error: any) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
