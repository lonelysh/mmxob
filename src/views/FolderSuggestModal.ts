import { App, SuggestModal, TFolder } from "obsidian";

export class FolderSuggestModal extends SuggestModal<TFolder> {
  private onChooseFolder: (folder: TFolder | null) => void;

  constructor(app: App, onChoose: (folder: TFolder | null) => void) {
    super(app);
    this.onChooseFolder = onChoose;
    this.setPlaceholder("选择文件夹…（Esc 取消）");
  }

  getSuggestions(query: string): TFolder[] {
    const all = this.app.vault.getAllLoadedFiles();
    const q = query.trim().toLowerCase();
    return all
      .filter((f): f is TFolder => f instanceof TFolder)
      .filter((f) => q === "" || f.path.toLowerCase().includes(q))
      .slice(0, 50);
  }

  renderSuggestion(folder: TFolder, el: HTMLElement): void {
    el.createEl("div", { text: folder.path });
  }

  onChooseSuggestion(folder: TFolder, evt: MouseEvent | KeyboardEvent): void {
    this.onChooseFolder(folder);
  }
}
