import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useEffect, useState } from "react";

const HomeBanner = () => {
	const bannerData = useSelector((state) => state.movieData.bannerData);
	const imageURL = useSelector((state) => state.movieData.imageURL);

	const [currentImage, setCurrentImage] = useState(0);

	const handlePrevious = () => {
		if (currentImage > 0) {
			setCurrentImage((currentState) => currentState - 1);
		}
	};

	const handleNext = () => {
		if (currentImage < bannerData.length - 1) {
			setCurrentImage((currentState) => currentState + 1);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (currentImage < bannerData.length - 1) {
				handleNext();
			} else {
				setCurrentImage(0)
			}
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	}, [bannerData, imageURL, currentImage]);


	return (
		<section className="w-full h-full">
			<div className="flex min-h-full max-h-[95vh] overflow-hidden">
				{bannerData.map((data, index) => {

					return (
						<div
							key={index}
							className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
							style={{ transform: `translateX(-${currentImage * 100}%)` }}
						>
							<div className="w-full h-full ">
								<img
									src={imageURL + data.backdrop_path}
									className="object-cover w-full h-full"
									alt=""
								/>
							</div>

							{/* Button Next and Previous */}
							<div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 lg:px-16 group-hover:lg:flex">
								<button className="bg-white p-1 text-xl rounded-full z-10 text-black">
									<FaAngleLeft onClick={handlePrevious} />
								</button>

								<button className="bg-white p-1 text-xl rounded-full z-10 text-black">
									<FaAngleRight onClick={handleNext} />
								</button>
							</div>

							<div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

							<div className="container mx-auto px-4 lg:px-16">
								<div className=" absolute bottom-0 max-w-md ">
									<h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
										{data?.name || data?.title}
									</h2>
									<p className="text-ellipsis line-clamp-3 my-2">
										{data.overview}
									</p>
									<div className="flex gap-4 items-center">
										<p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
										<span>|</span>
										<p>View : {Number(data.vote_count).toFixed(0)}</p>
									</div>
									<button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l  from-red-700 to-orange-500 shadow-md transition-all hover:scale-105 ">
										Play Now
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default HomeBanner;
