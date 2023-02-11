import { React, useState } from "react";
import { RModal } from "../../../context/modal";
import CreateReply from "../../Reply/createReply";

const CreateReplyModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button onClick={() => setOpen(true)}>Reply</button>
            {open && (
                <RModal onClose={() => setOpen(false)}>
                    <CreateReply setOpen={setOpen} />
                </RModal>
            )}
        </>
    );
};

export default CreateReplyModal;
