import { React, useState } from "react";
import { EModal } from "../../../context/modal";
import EditReply from "../../Reply/editReply";
const EditReplyModal = ({ replyId }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            {/* <button onClick={() => setOpen(true)}>Edit</button> */}
            <i
                className="fa-solid fa-ellipsis"
                onClick={() => setOpen(true)}
            ></i>

            {open && (
                <EModal onClose={() => setOpen(false)}>
                    <EditReply setOpen={setOpen} replyId={replyId} />
                </EModal>
            )}
        </>
    );
};

export default EditReplyModal;
