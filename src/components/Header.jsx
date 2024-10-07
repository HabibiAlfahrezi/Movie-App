import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/stripe.png";
import icon from "../assets/user.jpg";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { NavigationList } from "../data/Navigation";

const Header = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate  = useNavigate()
	
    useEffect(() => {
		if(searchInput){
			navigate("/search?q=" + searchInput);
		}
    }, [searchInput])


	return (
		<header className="fixed top-0 w-full h-16 bg-black bg-opacity-60 z-40">
			<div className="container mx-auto px-4 lg:px-16 flex items-center h-full">
				<Link to={'/'} className="w-10">
					<img src={logo} alt="logo" />
				</Link>

				<nav className="hidden lg:flex items-center gap-1 ml-5">
					{NavigationList.map((navList) => {
						return (
							<div key={navList.label}>
								<NavLink
									to={navList.href}
									className={({ isActive }) =>
										`px-2 hover:text-neutral-100 ${
											isActive && "text-neutral-100"
										}`
									}
								>
									{navList.label}
								</NavLink>
							</div>
						);
					})}
				</nav>

				<div className="ml-auto flex items-center gap-5">
					<form className="flex items-center gap-2" onSubmit={(e) => {
                        e.preventDefault()
                    }}>
						<input 
							type="text"
							placeholder="Search here..."
							className="bg-transparent px-4 py-1 border-none outline-none hidden lg:block"
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value)
                            }} 
						/>
						<button className="text-2xl text-white">
							<CiSearch />
						</button>
					</form>
					<div className="w-8 h-8 cursor-pointer rounded-full overflow-hidden active:scale-50 transition-all">
						<img src={icon} alt="icon" />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
