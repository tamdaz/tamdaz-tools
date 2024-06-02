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
		return <div className="w-full px-4 py-2 text-center pattern-paper pattern-yellow-300 pattern-bg-yellow-200 pattern-opacity-100 pattern-size-16">
			Site en développement...
		</div>
	}

	return (
		<>
			<div className="grid grid-cols-6">
				<div className="hidden xl:flex h-screen bg-neutral-50 border-r p-8 flex-col justify-center items-start gap-4">
					<Link to="/">Accueil</Link>
					<Link to="/generator/fstab">Générateur FStab</Link>
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
