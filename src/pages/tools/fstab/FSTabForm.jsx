import React, { useEffect } from "react";

/**
 * Allows to select filesystem
 *
 * @param {Object} obj
 * @param {string} obj.name
 * @param {string} obj.value
 * @param {string} obj.onChange
 */
function FileSystemSelect({ name, value, onChange }) {
	const filesystems = [
		"btrfs",
		"vfat",
		"ext2",
		"ext3",
		"ext4",
		"hfs",
		"jfs",
		"ntfs",
		"reiserfs",
		"udf",
		"xfs",
		"zfs",
		"swap",
		"minix",
		"udf",
	];

	return (
		<select name={name} onChange={onChange} value={value}>
			{filesystems.sort().map((v) => (
				<option value={v} key={v}>
					{v}
				</option>
			))}
		</select>
	);
}

/**
 * @param {Object} obj
 * @param {number} obj.id
 * @param {Function} updateRow
 * @param {Function} deleteRow
 */
function FSTabForm({ id, updateRow, deleteRow }) {
	const [row, setRow] = React.useState({
		id: id,
		device: "/dev/sda1",
		mountPoint: "/",
		fileSystem: "ext4",
		options: "defaults",
		dump: 0,
		verify: 0,
	});

	useEffect(() => {
		updateRow(row);
	}, [row]);

	/**
	 * @param {Event & { target: HTMLInputElement }} e
	 */
	const handleUpdate = (e) => {
		const name = e.target.name;
		const value =
			e.target.type === "checkbox" ? e.target.checked : e.target.value;

		setRow({ ...row, [name]: value });
	};

	return (
		<div className="grid grid-cols-7 gap-4 pb-4">
			<input
				onChange={handleUpdate}
				name="device"
				type="text"
				placeholder="/dev/sda1"
				value={row.device}
			/>
			<input
				onChange={handleUpdate}
				name="mountPoint"
				type="text"
				placeholder="/"
				value={row.mountPoint}
			/>
			<FileSystemSelect
				name="fileSystem"
				onChange={handleUpdate}
				value={row.fileSystem}
			/>
			<input
				name="options"
				onChange={handleUpdate}
				type="text"
				placeholder="defaults"
				value={row.options}
			/>
			<input
				name="dump"
				onChange={handleUpdate}
				type="checkbox"
				className="scale-50"
				value={row.dump}
			/>
			<select name="verify" onChange={handleUpdate} value={row.verify}>
				<option value="0">Ignorer</option>
				<option value="1">Vérifier</option>
				<option value="2">Vérifier après</option>
			</select>
			<button
				className="bg-red-500 text-white"
				onClick={() => deleteRow(row)}
			>
				Supprimer
			</button>
		</div>
	);
}

export default FSTabForm;
