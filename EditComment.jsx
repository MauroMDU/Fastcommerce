import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commentsActions from '../redux/actions/comments';

const EditComment = ({ commentId, initialComment, onClose, onSave, onCancel }) => {
    
    const [editedComment, setEditedComment] = useState(initialComment);

    let dispatch = useDispatch()

    const handleCommentChange = (event) => {
        setEditedComment(event.target.value);
    };

    const handleSave = async () => {
        dispatch(commentsActions.edit_comment({commentId, comment:editedComment}))
        onSave(editedComment)
    };

    return (
        <div className="z-200 fixed top-0 left-0 w-full h-full">
            <div className="flex flex-col w-[60vw] md:w-[30vw] h-[20vh] justify-between fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-lg shadow-md p-4">
                <h3 className="text-bold">Edit Comment:</h3>
                <input className="border-2 w-full h-[4vh] lg:h-[3vw] rounded-lg" type="text" value={editedComment} onChange={handleCommentChange} placeholder="Edit your comment here..."/>
                <div className="flex justify-between mt-4">
                    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                    <button onClick={onCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditComment;
