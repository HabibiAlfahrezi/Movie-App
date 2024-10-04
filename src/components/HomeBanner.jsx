import { useSelector } from "react-redux";

const HomeBanner = () => {
	const bannerData = useSelector((state) => state.movieData.bannerData);
    const imageURL = useSelector((state) => state.movieData.imageURL)
	console.log("Banner Home", bannerData);
	return (
		<div>
			<div>
                {
                    bannerData.map((data, index) => {
                        return (
                            <div key={index}>
                                <img src={imageURL + data.backdrop_path} alt="" />
                            </div>
                        )
                    })
                }
            </div>
		</div>
	);
};

export default HomeBanner;
