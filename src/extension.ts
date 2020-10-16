'use strict'

import * as vscode from 'vscode'
function addSemi(onNewLine: boolean) {
  return async () => {
    // Get the active text editor
    const editor = vscode.window.activeTextEditor
    if (!editor || !editor.selection.isEmpty) return

    if (onNewLine) {
      await vscode.commands.executeCommand("editor.action.insertLineAfter")
    }

    const initialPos = editor.selection.active
    await editor.edit(editBuilder => {
      const eolPos = editor.document.lineAt(initialPos.line).range.end
      editBuilder.insert(eolPos, ';')
    })

    // move cursor back to initial position
    editor.selection = new vscode.Selection(initialPos, initialPos)
    editor.revealRange(new vscode.Range(initialPos, initialPos))
  
  }
}
export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(
      vscode.commands.registerCommand('somosemi.newline', addSemi(true))
    )
    context.subscriptions.push(
      vscode.commands.registerCommand('somosemi.endline', addSemi(false))
    )
}
