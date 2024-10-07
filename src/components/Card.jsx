
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const Card = ({ data, trending, index, mediatype }) => {
	const imageURL = useSelector((state) => state.movieData.imageURL);
    const mediaType = data.media_type ?? mediatype;
   
	return (
		<Link to={"/"+mediaType+"/"+data.id} className="w-full min-w-[250px] max-w-[250px] h-full block rounded relative hover:scale-105 transition-all">
			<img src={imageURL+data?.poster_path} alt="" />
            <div className="absolute top-4">
                {
                    trending && (
                        <div className="py-2 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden">
                            #{index} Trending 
                        </div>
                    )
                }
            </div>

            <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/40 p-2">
                <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">{data?.name || data.title}</h2>
                <div className="text-sm text-neutral-400 flex justify-between items-center">
                    <p>{moment(data.release_date).format("MMMM Do YYYY")}</p>
                    <p className="bg-black px-1 rounded text-xs text-white">Rating: {Number(data.vote_average).toFixed(1)}</p>
                </div>
            </div>
		</Link>
	);
};

Card.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        media_type: PropTypes.string,
        poster_path: PropTypes.string,
        name: PropTypes.string,
        title: PropTypes.string,
        release_date: PropTypes.string,
        vote_average: PropTypes.number,
      }).isRequired,
      trending: PropTypes.bool,
      index: PropTypes.number,
      mediatype: PropTypes.string
}
export default Card;
