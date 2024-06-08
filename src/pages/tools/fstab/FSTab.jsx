import React, { useEffect } from "react";
import FSTabForm from "./FSTabForm";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { renderToStaticMarkup, renderToString } from "react-dom/server";

import Alert from "../../../components/Alert";

/**
 * FSTab page
 */
function FSTab() {
	const [id, setId] = React.useState(1);
	const [tabSize, setTabSize] = React.useState(8);

	const [rows, setRows] = React.useState([
		{
			id: id,
			device: "/dev/sda1",
			mountPoint: "/",
			fileSystem: "ext4",
			options: "defaults",
			dump: 0,
			verify: 0,
		},
	]);

	document.title = "Générateur du fichier fstab";

	useEffect(() => {
		setId(id + 1);
		setRows(rows);
	}, [rows]);

	/**
	 * Display the result of FSTab file.
	 */
	const FSTabOutput = () => {
		let output = "";

		rows.map(
			({ device, mountPoint, fileSystem, options, dump, verify }) => {
				output += device;
				output += "\t";
				output += mountPoint;
				output += "\t";
				output += fileSystem;
				output += "\t";
				output += options;
				output += "\t";
				output += dump ? 1 : 0;
				output += "\t";
				output += verify;
				output += "\n";
			},
		);

		return output;
	};

	/**
	 * Create the new row.
	 */
	const createRow = () => {
		setRows([
			...rows,
			{
				id: id,
				device: "",
				mountPoint: "",
				fileSystem: "ext4",
				options: "",
				dump: 1,
				verify: 2,
			},
		]);
	};

	/**
	 * Update the next row in tabs state.
	 *
	 * @param {{
	 *     id: number,
	 *     device: string,
	 *     mountPoint: string,
	 *     fileSystem: string,
	 *     options: string,
	 *     dump: number,
	 *     verify: number
	 * }} nextRow
	 */
	const updateRow = (nextRow) => {
		const updatedRows = [
			...rows.filter((row) => row.id !== nextRow.id),
			nextRow,
		];
		updatedRows.sort((a, b) => a.id - b.id);
		setRows(updatedRows);
	};

	/**
	 * Delete the selected row.
	 *
	 * @param {{
	 *     id: number,
	 *     device: string,
	 *     mountPoint: string,
	 *     fileSystem: string,
	 *     options: string,
	 *     dump: number,
	 *     verify: number
	 * }} rowToDelete
	 */
	const deleteRow = (rowToDelete) => {
		const newRows = [...rows.filter((row) => row.id !== rowToDelete.id)];

		setRows(newRows);
	};

	/**
	 * Copy the result FSTab output.
	 *
	 * @param {Event & { target: HTMLDivElement }} e
	 */
	const copyOutput = (e) => {
		navigator.clipboard.writeText(e.target.textContent);
	};

	return (
		<>
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
			{rows.length !== 0
				? rows.map((row) => {
						return (
							<FSTabForm
								id={row.id}
								updateRow={updateRow}
								deleteRow={deleteRow}
								key={`fstab-form-${row.id}`}
							/>
						);
					})
				: ""}
			<button
				className="px-4 py-2 bg-green-500 hover:bg-green-600"
				onClick={createRow}
			>
				Créer une ligne
			</button>
			<br />
			<br />
			<h2>Résultat : </h2>
			<div style={{ tabSize: 8 }}>
				<SyntaxHighlighter
					language="bash"
					style={monokai}
					onClick={copyOutput}
				>
					{renderToString(<FSTabOutput />)}
				</SyntaxHighlighter>
			</div>
			<Alert description="Vous pouvez cliquer copier ce résultat en cliquant dessus." />
		</>
	);
}

export default FSTab;
