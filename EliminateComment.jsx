import commentsActions from '../redux/actions/comments';
import { useDispatch } from 'react-redux';

const EliminateComment = ({ commentId, onDelete, onCancel }) => {

    let dispatch = useDispatch()

    const handleDelete = async () => {
        dispatch(commentsActions.eliminate_comment({commentId}))
        onDelete(commentId);
    };

    return (
        <div className="z-200 fixed top-0 left-0 w-full h-full">
            <div className="flex w-[60vw] md:w-[30vw] h-[20vh] flex-col justify-between fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-lg shadow-md p-4">
                <h3 className="text-bold">Delete Comment:</h3>
                <p>Are you sure you want to delete this comment?</p>
                <div className="flex justify-between mt-4">
                    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                    </button>
                    <button onClick={onCancel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EliminateComment;
