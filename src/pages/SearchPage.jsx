import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const SearchPage = () => {
	const location = useLocation();
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const navigateTo = useNavigate();
	const query = location?.search?.slice(3);
	const fetchData = async () => {
		try {
			const response = await axios.get(`/search/multi`, {
				params: {
					query: location?.search?.slice(3),
					page: page,
				},
			});

			setData((prevData) => {
				return [...prevData, ...response.data.results];
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (query) {
			setPage(1);
			setData([]);
			fetchData();
		}
	}, [location?.search]);

	const handleScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			setPage((prevPageNumber) => prevPageNumber + 1);
		}
	};

	useEffect(() => {
		if (query) {
			fetchData();
		}
	}, [page]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	console.log("location");

	return (
		<div className="py-16 px-4 lg:px-16">
			<div className="lg:hidden my-2  sticky top-[70px] z-10">
				<input
					type="text"
					className="px-4 py-1 w-full bg-white rounded-md text-neutral-900"
					placeholder="Search here..."
					value={location?.search?.slice(3)?.split("%20")?.join(" ")}
					onChange={(e) => {
						navigateTo("/search?q=" + e.target.value);
					}}
				/>
			</div>
			<div className="container mx-auto">
				<h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
					Search Results
				</h3>
				<div className="grid grid-cols-[repeat(auto-fit,250px)] gap-6 justify-center lg:justify-start">
					{data.map((searchData, index) => {
						return (
							<Card
								key={searchData.id + "search" + index}
								data={searchData}
								mediatype={searchData.mediatype}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
