import { IoIosHome } from "react-icons/io";
import { PiTelevisionSimple } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";

const NavigationList = [
	{
		label: "Tv Shows",
		href: "tv",
		icon: <PiTelevisionSimple />,
	},
	{
		label: "Movies",
		href: "movie",
		icon: <BiSolidMoviePlay />,
	},
];

const MobileNavigationList = [
	{
		label: "Home",
		href: "/",
		icon: <IoIosHome />,
	},
	...NavigationList,
	{
		label: "Search",
		href: "/search",
		icon: <CiSearch />,
	},
];

export { NavigationList, MobileNavigationList };
