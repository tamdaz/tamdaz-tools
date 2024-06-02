/**
 * Alert component with 4 types: info, success, warn and error
 *
 * @param {Object} obj
 *
 * @param {string} obj.title Alert title
 * @param {string} obj.description Alert description
 * @param {"info"|"success"|"warn"|"error"} obj.type Alert type
 */
export default function Alert({ title="", description="", type="info" }) {
    const getIcon = () => {
        const iconsName = {
            'info': 'info',
            'success': 'check',
            'warning': 'warning',
            'warn': 'warning',
            'error': 'error',
            'debug': 'construction'
        }

        return iconsName[type] ?? "unknown";
    }

    const getColor = () => {
        const colorsName = {
            'info': 'info',
            'success': 'success',
            'warning': 'warning',
            'error': 'error',
            'debug': 'debug',
        }

        return `tz-alert-${colorsName[type]}` ?? 'tz-alert-debug'
    }

	return (
		<div className={getColor()}>
			<i className="material-symbols-outlined pr-4 text-3xl">{ getIcon() }</i>
			<div className="flex flex-col">
				<span className="block font-bold text-xl">{title}</span>
				<span className="block">{description}</span>
			</div>
		</div>
	);
}
