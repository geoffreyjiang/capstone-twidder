import { React, useState } from "react";
import { EModal } from "../../../context/modal";
import EditTweet from "./EditTweetForm";
import { useSelector } from "react-redux";
import "./index.css";
const EditTweetModal = () => {
    const [open, setOpen] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);

    let img;
    if (!sessionUser.profile_pic)
        img =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    else img = sessionUser.profile_pic;

    return (
        <>
            <i
                className="fa-solid fa-ellipsis"
                onClick={() => setOpen(true)}
            ></i>

            {open && (
                <EModal onClose={() => setOpen(false)}>
                    <EditTweet setOpen={setOpen} />
                </EModal>
            )}
        </>
    );
};

export default EditTweetModal;
