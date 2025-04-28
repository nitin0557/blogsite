import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { addComment } from '../store/reducers/blogSlice';
import { AppDispatch, RootState } from '../store';
import "../style/BlogDetail.css"

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = useSelector((state: RootState) =>
    state.blog.blogs.find((b) => b.id === Number(id))
  );
  const dispatch = useDispatch<AppDispatch>();

  const [newComment, setNewComment] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAddComment = useCallback(() => {
    if (!blog) return;
    const trimmedComment = newComment.trim();
    if (trimmedComment) {
      dispatch(addComment({ id: blog.id, comment: trimmedComment }));
      setNewComment('');
    }
  }, [dispatch, blog, newComment]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShowModal(true);
    }).catch(() => {
      alert('Failed to copy URL.');
    });
  }, []);

  const handleCloseModal = useCallback(() => setShowModal(false), []);

  if (!blog) {
    return <p className="text-center my-5">Blog not found</p>;
  }

  return (
    <>
      <Card className="my-4 shadow-sm">
        <div className="d-flex justify-content-center align-items-center p-3">
          <Card.Img
            variant="top"
            src={blog.imageUrl}
            alt={blog.title}
            className='image-container'
          />
        </div>
        <Card.Body>
          <Card.Title className="h4">{blog.title}</Card.Title>
          <Card.Text>{blog.body}</Card.Text>

          <Button variant="success" onClick={handleShare}>Share</Button>

          <hr className="my-4" />

          <h5>Comments</h5>
          <div className="mb-3">
            {blog.comments.length > 0 ? (
              blog.comments.map((comment, idx) => (
                <p key={idx} className="border rounded p-2 my-2 bg-light">
                  {comment}
                </p>
              ))
            ) : (
              <p className="text-muted">No comments yet.</p>
            )}
          </div>

          <Form className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
            <Button variant="primary" onClick={handleAddComment}>
              Post
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Blog URL Copied!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          The blog link has been copied to your clipboard. Share it with your friends!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BlogDetail;
