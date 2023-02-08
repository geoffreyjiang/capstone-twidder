import { React, useState } from "react";
import { Modal } from "../../../context/modal";
import EditTweet from "./EditTweetForm";

const EditTweetModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(true)}>Edit</button>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <EditTweet setOpen={setOpen} />
                </Modal>
            )}
        </>
    );
};

export default EditTweetModal;
