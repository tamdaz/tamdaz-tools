import { Link, Outlet } from "react-router-dom";
import "./css/index.css";

/**
 * Application view
 */
function Root() {
	/**
	 * Display a minimal alert to warn
	 */
	const DisplayDevMode = () => {
		return (
			<div className="w-full px-4 py-2 text-center bg-yellow-700 pattern-size-16">
				Site en développement...
			</div>
		);
	};

	return (
		<>
			<div className="grid grid-cols-6">
				<div className="hidden xl:flex h-screen bg-neutral-50 dark:bg-neutral-950 border-r border-neutral-500/50 p-8 flex-col justify-center items-start gap-4">
					<Link to="/">Accueil</Link>
					<Link to="/tools/fstab-generator">Générateur FStab</Link>
				</div>
				<div className="col-span-6 xl:col-span-5">
					<DisplayDevMode />
					<div className="p-8">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}

export default Root;
