import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import HorizontalCard from "../components/HorizontalCard";
import useFetch from "../hooks/useFetch";

const DetailPage = () => {
	const params = useParams();
	const imageURL = useSelector((state) => state.movieData.imageURL);
	const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
	const { data: castData, loading } = useFetchDetails(
		`/${params.explore}/${params.id}/credits`
	);
	const { data: similarData } = useFetch(
		`/${params?.explore}/${params?.id}/similar`
	);
	const { data: recomendationData } = useFetch(
		`/${params?.explore}/${params?.id}/recommendations`
	);

	console.log("castData", castData);
	console.log("data", data);
	if (loading) {
		return <p>Loading...</p>; // Display loading indicator
	}
	const duration = (data?.runtime / 60)?.toFixed(1)?.split(".");
	const writer = castData?.crew
		?.filter((el) => el?.job === "Writer")
		.map((el) => el.name)
		.join(", ");

	return (
		<div>
			<div className="w-full h-[350px] relative hidden lg:block">
				<div className="w-full h-full">
					<img
						src={imageURL + data?.backdrop_path}
						alt=""
						className="h-full w-full object-cover"
					/>
				</div>
				<div className="absolute w-full top-0 h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
			</div>

			<div className="px-4 lg:px-16 py-16 lg:py-1 flex flex-col lg:flex-row gap-5 lg:gap-10">
				<div className="lg:-mt-28 relative mx-auto w-fit lg:mx-0 min-w-60">
					<img
						src={imageURL + data?.poster_path}
						alt=""
						className="h-100 w-60 object-cover rounded"
					/>
				</div>
				<div>
					<h2 className="text-2xl lg:text-4xl font-bold text-white">
						{data?.title || data?.name}
					</h2>
					<p className="text-neutral-400">{data?.tagline}</p>

					<Divider />

					<div className="flex items-center mb-3 gap-3">
						<p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
						<span>|</span>
						<p>Vote : {Number(data?.vote_count)}</p>
						{duration &&
							duration !=
								isNaN(
									<div>
										<span>|</span>
										<p>
											Run Time : {duration[0]}h {duration[1]}m
										</p>
									</div>
								)}
					</div>

					<Divider />

					<div>
						<h3 className="text-xl font-bold text-white mb-1">Overview</h3>
						<p>{data?.overview}</p>
						<Divider />
						<div className="flex items-center gap-3 my-3 text-center text-base">
							<p>Status : {data?.status}</p>
							<span>|</span>
							<p>
								Release Date :{" "}
								{moment(data?.release_date).format("MMMM Do YYYY")}
							</p>
							{data?.revenue && (
								<>
									<span>|</span>
									<p>Reveneu : {data?.revenue}</p>
								</>
							)}
						</div>
						<Divider />
					</div>

					<div>
						<p>
							<span className="text-white">Director</span> :{" "}
							{castData?.crew[0]?.name}
						</p>

						<Divider />

						<p>
							<span className="text-white">Writer</span> : {writer}
						</p>
					</div>

					<Divider />

					<div>
						<h2 className="font-bold text-lg">Cast :</h2>
					</div>

					<div className="grid grid-cols-[repeat(auto-fit,96px)] gap-6 my-4 justify-center lg:justify-start">
						{castData?.cast
							?.filter((el) => el?.profile_path)
							.map((cast, index) => {
								return (
									<div key={cast?.id + "cast" + index} className="">
										<div>
											<img
												src={imageURL + cast?.profile_path}
												alt=""
												className="w-24 h-24 object-cover rounded-full"
											/>
										</div>
										<div>
											<p className="font-bold text-center text-sm text-neutral-400">
												{cast?.name}
											</p>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>

			<div>
				<HorizontalCard
					data={similarData}
					heading={`Similar ${params?.explore}`}
					mediaType={params?.explore}
				/>

        <HorizontalCard
					data={recomendationData}
					heading={`Recomendation ${params?.explore}`}
					mediaType={params?.explore}
				/>
			</div>
		</div>
	);
};

export default DetailPage;
