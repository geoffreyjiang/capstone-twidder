import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReply } from "../../store/reply";
import { createLike, editLikes } from "../../store/likes";
const CreateLike = () => {
    const user = useSelector((state) => state.session.user);
    // console.log(user);
    const { id } = useParams();
    // const isLiked = useSelector((state) => console.log());

    const dispatch = useDispatch();
    const history = useHistory();
    const [like, setLike] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login!");
        }

        const data = {
            isLiked: like,
            user_id: user.id,
        };
        dispatch(createLike());
    };
    return (
        <>
            <div className="create-like-container">
                <form className="like-form" onSubmit={handleSubmit}>
                    <div className="input-like">
                        <input
                            type="checkbox"
                            value={like}
                            onChange={(e) => setLike(!like)}
                        ></input>
                    </div>

                    <div>
                        <button className="submitBtn" type="submit">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateLike;
