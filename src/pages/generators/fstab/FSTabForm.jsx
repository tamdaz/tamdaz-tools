import React, { useEffect, useId } from "react";

/**
 * @param {Object} obj
 * @param {number} obj.id
 * @param {Function} updateTab
 * @param {Function} deleteTab
 */
function FSTabForm({ id, updateTab, deleteTab }) {
    const [tab, setTab] = React.useState({
        id: id,
        device: "/dev/sda1",
        mountPoint: "/",
        fileSystem: "ext4",
        options: "defaults",
        dump: 0,
        verify: 0
    });

    useEffect(() => {
        updateTab(tab);
    }, [tab]);

    /**
     * @param {Event & { target: HTMLInputElement }} e 
     */
    const handleUpdate = (e) => {
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setTab({
            ...tab,
            [name]: value
        })
    }

    return <div className="grid grid-cols-7 gap-4 pb-4">
        <input onChange={handleUpdate} name="device" type="text" placeholder="/dev/sda1" value={tab.device} />
        <input onChange={handleUpdate} name="mountPoint" type="text" placeholder="/" value={tab.mountPoint} />
        <select name="fileSystem" onChange={handleUpdate} value={tab.fileSystem}>
            <option value="vfat">vfat</option>
            <option value="ext2">ext2</option>
            <option value="ext3">ext3</option>
            <option value="ext4">ext4</option>
            <option value="xfs">xfs</option>
            <option value="btrfs">btrfs</option>
            <option value="ntfs">ntfs</option>
        </select>
        <input name="options" onChange={handleUpdate} type="text" placeholder="defaults" value={tab.options} />
        <input name="dump" onChange={handleUpdate} type="checkbox" className="scale-50" value={tab.dump} />
        <select name="verify" onChange={handleUpdate} value={tab.verify}>
            <option value="0">Ignorer</option>
            <option value="1">Vérifier</option>
            <option value="2">Vérifier après</option>
        </select>
        <button className="bg-red-500 text-white" onClick={() => deleteTab(tab)}>Supprimer</button>
    </div>
}

export default FSTabForm;