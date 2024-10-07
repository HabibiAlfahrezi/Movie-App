import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
	const params = useParams();
	const [pageNumber, setPageNumber] = useState(1);
	const [data, setData] = useState([]);
	const [totalPageNumber, setTotalPageNumber] = useState(0);

	const fetchData = async () => {
		try {
			const response = await axios.get(`/discover/${params.explore}`, {
				params: {
					page: pageNumber,
				},
			});

			setData((prevData) => {
				return [...prevData, ...response.data.results];
			});
			setTotalPageNumber(response.data.total_pages);
		} catch (error) {
			console.log(error);
		}
	};

	const handleScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			setPageNumber((prevPageNumber) => prevPageNumber + 1);
		}
	};

	useEffect(() => {
		fetchData();
	}, [pageNumber]);

  useEffect(() => {
    setPageNumber(1)
    setData([])
    fetchData()
  }, [params.explore])

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<div className="pt-16 px-4 lg:px-16">
			<h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
				Popular {params.explore}
			</h3>
			<div className="grid grid-cols-[repeat(auto-fit,250px)] gap-6">
				{data.map((data, index) => {
					return <Card key={data.id + "ExploreSection" + index} data={data} mediatype={params.explore}/>;
				})}
			</div>
		</div>
	);
};

export default ExplorePage;
