import React, { useEffect } from "react";
import FSTabForm from "./FSTabForm";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

import Alert from "../../../components/Alert";

/**
 * FSTab page
 */
function FSTab() {
    const [id, setId] = React.useState(1);

    const [tabs, setTabs] = React.useState([{
        id: id,
        device: "/dev/sda1",
        mountPoint: "/",
        fileSystem: "ext4",
        options: "defaults",
        dump: 0,
        verify: 0
    }]);

    document.title = "Générateur du fichier fstab"

    useEffect(() => {
        setId(id + 1);
        
        setTabs(tabs);
    }, [tabs]);

    /**
     * Create the new tab.
     */
    const createTab = () => {
        setTabs([
            ...tabs, {
                id: id,
                device: "",
                mountPoint: "",
                fileSystem: "ext4",
                options: "",
                dump: 1,
                verify: 2
            }
        ]);
    }

    /**
     * Update the next row tab in tabs state.
     * 
     * @param {Array} nextTab
     */
    const updateTab = (nextTab) => {
        const updatedTabs = [...tabs.filter(tab => tab.id !== nextTab.id), nextTab];

        updatedTabs.sort((a, b) => a.id - b.id);

        setTabs(updatedTabs);
    }

    /**
     * Delete the selected row tab.
     */
    const deleteTab = (tabToDelete) => {
        const newTabs = [...tabs.filter(tab => tab.id !== tabToDelete.id)];

        setTabs(newTabs);
    }

    /**
     * Copy the result fstab output.
     * 
     * @param {Event & { target: HTMLDivElement }} e 
     */
    const copyOutput = (e) => {
        navigator.clipboard.writeText(e.target.textContent);
    }

    return <>
        <h1>Générateur FSTab</h1>

        <Alert
            type="warning"
            title="Avertissement sur la configuration de fstab."
            description="Avant de faire des modifications dans le fichier /etc/fstab, assurez-vous de garder l'ancienne version de ce fichier pour éviter les erreurs."
        />

        <div className="grid grid-cols-7 gap-8 text-center py-4">
            <span>Périphérique</span>
            <span>Point de montage</span>
            <span>Système de fichiers</span>
            <span>Options</span>
            <span>Sauvegarder ?</span>
            <span>Vérifier ?</span>
            <span>Actions</span>
        </div>

        {
            tabs.length !== 0 ? tabs.map((tab) => {
                return <FSTabForm
                    id={tab.id}
                    updateTab={updateTab}
                    deleteTab={deleteTab}
                    key={`fstab-form-${tab.id}`}
                />
            }) : ""
        }

        <button className="px-4 py-2 bg-green-500 hover:bg-green-600" onClick={createTab}>
            Créer une ligne
        </button>

        <br />
        <br />
        <h2>Résultat : </h2>
        
        <div style={{ tabSize: 25 }}>
            <SyntaxHighlighter language="bash" style={monokai} onClick={copyOutput}>
                {
                    tabs.length !== 0 ? 
                    "#<file system>\t<dir>\t<type>\t<options\t<dump>\t<pass>\n" +
                    tabs.map(({ device, mountPoint, fileSystem, options, dump, verify }) => {
                        return `${device}\t${mountPoint}\t${fileSystem}\t${options}\t${dump ? 1 : 0}\t${verify}`
                    }).join("\n") : " "
                }
            </SyntaxHighlighter>
        </div>
        <Alert description="Vous pouvez cliquer dessus pour copier ce résultat" />
    </>
}

export default FSTab;