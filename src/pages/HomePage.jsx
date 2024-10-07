import { useSelector } from "react-redux";
import HomeBanner from "../components/HomeBanner";
import HorizontalCard from "../components/HorizontalCard";
import useFetch from "../hooks/useFetch";

const HomePage = () => {
	const trendingData = useSelector((state) => state.movieData.bannerData);
  const {data : nowPlayingData} = useFetch("/movie/now_playing")
  const {data : topRated} = useFetch("/movie/top_rated")
  const {data : tvPopulerData} = useFetch("/tv/popular")
  const {data : tvOnTheAirData} = useFetch("/tv/on_the_air")

	
	return (
		<div>
			<HomeBanner />
			<HorizontalCard
				data={trendingData}
				heading={"Trending Show"}
				trending={true}
			/>
			<HorizontalCard
				data={nowPlayingData}
				heading={"Now Playing"}
				nowplaying={true}
        mediaType={"movie"}
			/>
      <HorizontalCard
				data={topRated}
				heading={"Top Rated Movies"}
				nowplaying={true}
        mediaType={"movie"}
			/>
      <HorizontalCard
				data={tvPopulerData}
				heading={"Popular Tv Show"}
				nowplaying={true}
        mediaType={'tv'}
			/>
      <HorizontalCard
				data={tvOnTheAirData}
				heading={"On The Air"}
				nowplaying={true}
        mediaType={"tv"}
			/>
		</div>
	);
};

export default HomePage;
