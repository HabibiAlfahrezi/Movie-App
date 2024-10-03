import { NavLink } from "react-router-dom";
import { MobileNavigationList } from "../data/Navigation";

const MobileNavigation = () => {
	return (
		<section className="lg:hidden h-14 bg-neutral-600 bg-opacity-40 fixed bottom-0 w-full">
			<div className="flex h-full items-center justify-between text-neutral-500">
				{MobileNavigationList.map((navList, index) => {
					return (
						<NavLink
							key={navList.label + "MobileNavigation"}
							to={navList.href}
							className={({ isActive }) =>
								`px-4 flex flex-col items-center justify-center ${
									isActive && "text-white"
								} `
							}
						>
							<div className="text-2xl">{navList.icon}</div>
							<p className="text-sm">{navList.label}</p>
						</NavLink>
					);
				})}
			</div>
		</section>
	);
};

export default MobileNavigation;
