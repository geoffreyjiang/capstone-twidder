import { React, useState } from "react";
import { Modal } from "../../../context/modal";
import EditTweet from "./EditTweetForm";

const EditTweetModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <i class="fa-solid fa-ellipsis" onClick={() => setOpen(true)}></i>

            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <EditTweet setOpen={setOpen} />
                </Modal>
            )}
        </>
    );
};

export default EditTweetModal;
