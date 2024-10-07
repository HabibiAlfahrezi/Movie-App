import { NavLink } from "react-router-dom";
import { MobileNavigationList } from "../data/Navigation";

const MobileNavigation = () => {
	return (
		<section className="lg:hidden h-14 bg-black bg-opacity-65 fixed bottom-0 backdrop-blur-md w-full z-10">
			<div className="flex h-full items-center justify-between text-neutral-500">
				{MobileNavigationList.map((navList) => {
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
