import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "./store/movieSlice";

function App() {
	const dispacth = useDispatch();

	const fetchTrendingData = async () => {
		try {
			const response = await axios.get("/trending/all/week");

			dispacth(setBannerData(response.data.results));
		} catch (error) {
			console.log("Error", error);
		}
	};

	const fetchConfiguration = async () => {
		try {
			const response = await axios.get(
				"https://api.themoviedb.org/3/configuration"
			);

			dispacth(setImageURL(response.data.images.secure_base_url + "original"));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchTrendingData();
		fetchConfiguration();
	}, []);

	return (
		<>
			<main className="pb-14 lg:pb-0">
				<Header />
				<div className="pt-16">
					<Outlet />
				</div>
				<Footer />
				<MobileNavigation />
			</main>
		</>
	);
}

export default App;
