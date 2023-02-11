import { React, useState } from "react";
import { Modal } from "../../../context/modal";
import EditReply from "../../Reply/editReply";
const EditReplyModal = ({ replyId }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {/* <button onClick={() => setOpen(true)}>Edit</button> */}
            <i class="fa-solid fa-ellipsis" onClick={() => setOpen(true)}></i>

            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <EditReply setOpen={setOpen} replyId={replyId} />
                </Modal>
            )}
        </>
    );
};

export default EditReplyModal;
