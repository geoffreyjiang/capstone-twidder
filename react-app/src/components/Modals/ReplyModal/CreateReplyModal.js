import { React, useState } from "react";
import { Modal } from "../../../context/modal";
import CreateReply from "../../Reply/createReply";

const CreateReplyModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(true)}>Reply</button>
            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <CreateReply setOpen={setOpen} />
                </Modal>
            )}
        </>
    );
};

export default CreateReplyModal;
