import { useRef } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import PropTypes from "prop-types";

const HorizontalCard = ({ data = [], heading, trending, mediaType}) => {
	const containerRef = useRef();

	const handlePrevious = () => {
		containerRef.current.scrollLeft -= 300;
	};
	const handleNext = () => {
		containerRef.current.scrollLeft += 300;
	};

	return (
		<div className="container mx-auto px-4 lg:px-16 my-10">
			<h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">
				{heading}
			</h2>
			<div className=" relative">
				<div
					ref={containerRef}
					className="grid grid-cols-[(auto fit,250px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scroll-bar"
				>
					{data.map((data, index) => {
						return (
							<Card
								key={data.id + heading + index}
								data={data}
								index={index + 1}
								trending={trending}
                                mediatype={mediaType}
							/>
						);
					})}
				</div>

				<div className="absolute top-0 hidden lg:flex justify-between w-full items-center h-full">
					<button className="bg-white p-1 text-black rounded-full -ml-2 z-10">
						<FaAngleLeft onClick={handlePrevious}/>
					</button>
					<button className="bg-white p-1 text-black rounded-full -mr-2 z-10">
						<FaAngleRight onClick={handleNext} />
					</button>
				</div>
			</div>
		</div>
	);
};
HorizontalCard.propTypes = {
    data: PropTypes.array, 
    heading: PropTypes.string.isRequired,
    trending: PropTypes.bool,
    mediaType: PropTypes.string
}
export default HorizontalCard;
