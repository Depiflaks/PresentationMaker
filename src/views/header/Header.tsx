import { headerIconsMap } from "~/store/icons/header/headerIcons";
import styles from "./Header.module.css";
import { useRef, useState } from "react";
import { useAppActions } from "../hooks/useAppActions";
import { useAppSelector } from "../hooks/useAppSelector";
import { loadEditorFromStorage, saveEditorToStorage } from "~/store/storage/localStorageHandler";
import { validateEditor } from "~/store/storage/importHandler";
import ImportError from "./importError/ImportError";

export default function Header() {
    const title = useAppSelector((editor) => editor.presentation.title);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const importInputRef = useRef<HTMLInputElement>(null);
    const exportLinkRef = useRef<HTMLAnchorElement>(null);

    const [isError, setIsError] = useState<boolean>(false);

    const { updatePresentationTitle } = useAppActions();

    const onTitleChange = (newTitle: string) => {
        updatePresentationTitle({ newTitle });
    };

    const onImportButtonClick = () => {
        importInputRef.current?.click();
    };

    const onExportButtonClick = () => {
        const editor = loadEditorFromStorage();
        const blob = new Blob([JSON.stringify(editor)], { type: 'application/json' });

        const url = URL.createObjectURL(blob);
        if (exportLinkRef.current) {
            exportLinkRef.current.href = url;
            exportLinkRef.current.download = `${title}.json`;
            exportLinkRef.current.click();
        }
        URL.revokeObjectURL(url);
    }

    const onImport = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            const content = await file.text();
            const editor = JSON.parse(content);
            const validationErrors = validateEditor(editor);
            if (validationErrors) {
                setIsError(true);
                return;
            }
            saveEditorToStorage(editor);
            location.reload();
        }
    };

    return (
        <header className={styles.header}>
            <div className={`${styles.child} ${styles.left}`}>
                <img
                    src={headerIconsMap.logo}
                    alt="Logo"
                    className={styles.logo}
                />
                <input
                    className={styles.title}
                    ref={titleInputRef}
                    type="text"
                    defaultValue={title}
                    onChange={() => {
                        onTitleChange(titleInputRef.current?.value ?? "");
                    }}
                />
            </div>
            <div className={styles.center}>
                <h1>
                    BANANA <span>MAKER</span>
                </h1>
            </div>
            <div className={`${styles.child} ${styles.right}`}>
                {isError ? (
                    <ImportError
                        onClose={() => {
                            setIsError(false);
                        }}
                    />
                ) : (
                    <button title="Import" onClick={onImportButtonClick}>
                        <img src={headerIconsMap.import} alt="Import" />
                    </button>
                )}
                <button title="Export" onClick={onExportButtonClick}>
                    <img src={headerIconsMap.export} alt="Export" />
                </button>
            </div>
            <input
                ref={importInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={onImport}
                accept=".json"
            />
            <a ref={exportLinkRef} style={{ display: "none" }} />
        </header>
    );
}