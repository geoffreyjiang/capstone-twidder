import { React, useState } from "react";
import { RModal } from "../../../context/modal";
import "./anotha.css";
import CreateAllReply from "./AllTweetReplyForm";
const CreateAllReplyModal = ({ tweetId }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {/* <button className="create-btn" onClick={() => setOpen(true)}>
                Reply
            </button> */}
            <i
                className="fa-solid fa-reply replyIcon"
                id="replyIcon"
                onClick={() => setOpen(true)}
            ></i>

            {open && (
                <RModal onClose={() => setOpen(false)}>
                    <CreateAllReply setOpen={setOpen} tweetId={tweetId} />
                </RModal>
            )}
        </>
    );
};

export default CreateAllReplyModal;
