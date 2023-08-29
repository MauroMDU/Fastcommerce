import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import commentsActions from '../redux/actions/comments';
import EditComment from '../components/EditComment';
import EliminateComment from './EliminateComment';
import { formatDistanceToNow } from 'date-fns';

let ModalComment = ({ isOpen, onClose, productId, page }) => {

    console.log(productId)

    let [newComment, setNewComment] = useState('');
    let [editingCommentId, setEditingCommentId] = useState(null);
    let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    let [deletingCommentId, setDeletingCommentId] = useState(null);
    let [currentPage, setCurrentPage] = useState(1);

    let dispatch = useDispatch();
    
    let user = JSON.parse(localStorage.getItem("user"))
    console.log(user?._id)

    let comments = useSelector((store) => store.comments.comments);
    console.log(comments);

    //PARA TRAER LOS DATOS DE LOS COMMENTS:
    //PARA TRAER LOS DATOS DE LOS COMMENTS:

    let getComments = (page) => {
        dispatch(commentsActions.datos_comments({productId, page}))
    }
    
    useEffect(() => {
        getComments(page)
        dispatch(commentsActions.datos_comments({ productId, page: currentPage}))
    }, [isOpen, productId, page, currentPage]);

    useEffect(() => {
        dispatch(commentsActions.datos_comments({ productId, page: currentPage}))
    }, [productId, page, currentPage]);

    //PARA ENVIAR UN NUEVO COMMENT:
    //PARA ENVIAR UN NUEVO COMMENT:

    // Función para manejar el cambio en el text area del formulario
    let handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    // Función para manejar el envío del formulario
    let handleSubmit = async (event) => {
        event.preventDefault()
        dispatch(commentsActions.post_comment({ product_id: productId, user_id: user._id, comment: newComment }))
        setNewComment('')
        //onClose();
    };

    //PARA EDITAR UN NUEVO COMMENT:
    //PARA EDITAR UN NUEVO COMMENT:

    // Función para activar la edición del comentario
    let handleEditClick = (commentId) => {
        setEditingCommentId(commentId);
    };

    // Función para desactivar la edición del comentario
    let handleEditCancel = () => {
        setEditingCommentId(null);
    };

    // Función para guardar el comentario editado
    let handleEditSave = (editedComment) => {
    // Actualizar el comentario en el estado local (Redux)
    let updatedComments = comments.map((comment) =>
        comment._id === editingCommentId ? { ...comment, comment: editedComment } : comment
    );
    dispatch(commentsActions.datos_comments(updatedComments));

    // Desactivar la edición del comentario
        setEditingCommentId(null);
    };

    //PARA ELIMINAR UN NUEVO COMMENT:
    //PARA ELIMINAR UN NUEVO COMMENT:
    
    // Función para eliminar un comentario
    let handleDeleteClick = (commentId) => {
        setIsDeleteModalOpen(true);
        setDeletingCommentId(commentId);
    };
    
    let handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setDeletingCommentId(null);
    };
    
    let handleDeleteConfirm = () => {
        // Llamar a la función para eliminar el comentario
        handleDeleteClick(deletingCommentId);
        setIsDeleteModalOpen(false);
    };
    
    // Función para verificar si el comentario pertenece al usuario logueado (FINES ILUSTRATIVOS)
    let isCommentBelongsToUser = (comment) => {
        return comment?.user_id?._id === user?._id;
    };

    //PARA EL PAGINADO:
    //PARA EL PAGINADO:
    let handleNextPage = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };
    
    let handlePrevPage = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

    if (!isOpen) {
        return null;
    }
    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-100" onClick={onClose}/>
            )}
            <div className="flex flex-col fixed w-[90vw] md:w-[40vw] h-[90vh] justify-end top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#EBEBEB] rounded-md shadow-md p-4">
                {comments && comments?.map((comment) => (
                <div key={comment?._id} className="flex flex-col w-[90vw] h-[17vh] md:w-[40vw] items-start self-center justify-between bg-white p-2 mt-2 mb-2" >
                    {isCommentBelongsToUser(comment) 
                    ? 
                    <div className="flex justify-between items-center w-[90vw] md:w-[38vw] md:p-2">
                        <div className="flex">
                            {isCommentBelongsToUser(comment)
                            ? 
                            <div className="flex h-[3.5vh] p-1 justify-between items-center text-bold border border-gray-500 rounded-md ps-2 bg-white-500 text-blue-600 py-2">
                                <button className="flex text-[1.5vh] justify-around items-center" onClick={() => handleEditClick(comment?._id)}>
                                    Edit
                                    <img className="w-[4vw] md:w-[1.5vw] " src="/src/assets/images/pencil.png" alt="" />
                                </button>
                            </div>
                            :
                            <div> </div>}
                            {isCommentBelongsToUser(comment)
                            ? 
                                <button className="ps-2" onClick={() => handleDeleteClick(comment?._id)}>
                                    <img className="w-[4vw] md:w-[1.5vw] " src="/src/assets/images/trash.png" alt="trash" />
                                </button>
                            :
                            <div></div>}
                        </div>
                        <div className="flex items-center pe-2">
                            <h3 className="text-bold pe-4">{comment?.user_id?.email}</h3>
                            <img className="w-[9vw] md:w-[3vw] rounded-full" src={comment?.user_id?.photo} alt="" />
                        </div>
                    </div>  
                    : 
                    <div className="flex items-center p-2">
                        <img className="w-[9vw] md:w-[3vw] rounded-full" src={comment?.user_id?.photo} alt="" />
                        <h3 className="text-bold ps-4">{comment?.user_id?.email}</h3>
                    </div>}        
                    <p className="flex items-center h-[3vh] p-2 pb-2 font-normal">{comment?.comment}</p>
                    <div className="flex items-center ps-4 justify-between  w-[85vw] md:w-[36vw] ">
                        <div className="flex w-[30vw] md:w-[10vw] justify-between items-center">
                            <img className="w-[6vw] md:w-[2vw] " src="/src/assets/images/chat.png" alt="chat" />
                            <p className="text-bold">10</p>
                            <div className="flex h-[3.5vh] p-1 justify-between items-center text-bold border border-gray-500 rounded-md ps-2 bg-white-500 text-blue-600 py-2">
                                <button className="flex text-[1.5vh] justify-around items-center" type="submit">
                                    Reply
                                    <img className="w-[4vw] md:w-[1.5vw] " src="/src/assets/images/pencil.png" alt="pencil" />
                                </button>
                            </div>
                        </div>
                        <div>
                            <p className="font-normal text-md text-gray-500">{formatDistanceToNow(new Date(comment?.createdAt))} ago</p>
                        </div>
                    </div>
                </div>
                ))}
                <div className="flex h-[6vh] md:h-[3vh] w-[80vw] md:w-[10vw] justify-between rounded-3xl self-center">
                    {currentPage === 1
                    ?
                    <button className="text-gray-500" onClick={handlePrevPage} disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    :
                    <button className="hover:scale-[1.3] hover:text-blue-600" onClick={handlePrevPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    }
                    <p className="font-sans">{currentPage}</p>
                    {comments?.length === 0
                    ?
                    <button className="text-gray-500" onClick={handleNextPage}  disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    :
                    <button className="hover:scale-[1.3] hover:text-blue-600" onClick={handleNextPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    }
                </div>
                <form className="flex items-center" onSubmit={handleSubmit}>
                    <input className=" border-2 w-[80vw] md:w-[40vw] h-[9vw] md:h-[3vw] rounded-md" type="text" value={newComment} onChange={handleCommentChange} placeholder="Say something here..."/>
                    <button className="hover:scale-[1.1] hover:blue-600" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="33" viewBox="0 0 31 33" fill="none">
                            <path d="M30.2859 3.04692C30.4128 2.36111 30.1412 1.6625 29.5846 1.24235C29.0279 0.822203 28.2816 0.752635 27.6568 1.06265L1.83952 13.8738C1.18542 14.1984 0.784925 14.8788 0.818647 15.6083C0.852368 16.3377 1.31394 16.9783 1.9952 17.2411L10.9283 20.6877C11.6953 20.9837 12.5656 20.7353 13.0608 20.0791L18.1317 13.3604C18.7443 12.5487 19.8989 12.3874 20.7106 13C21.5223 13.6126 21.6837 14.7672 21.0711 15.5789L16.0003 22.2976C15.505 22.9538 15.5047 23.8588 15.9996 24.5152L21.7635 32.161C22.2031 32.7441 22.9457 33.0124 23.6564 32.8448C24.3671 32.6772 24.9117 32.1055 25.0445 31.3875L30.2859 3.04692Z" fill="#9D9D9D"/>
                        </svg>
                    </button>
                </form>
                {editingCommentId && (
                    <EditComment commentId={editingCommentId} initialComment={comments.find((comment) => comment._id === editingCommentId)?.comment} onSave={handleEditSave} onCancel={handleEditCancel}/>
                )}
                {isDeleteModalOpen && (
                    <EliminateComment commentId={deletingCommentId} onDelete={handleDeleteConfirm} onCancel={handleDeleteCancel}/>
                )}
            </div>
            
             
        </>
    );
};

export default ModalComment;