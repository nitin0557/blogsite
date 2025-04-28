import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { Blog } from '../types/blog';
import { AppDispatch } from '../store';
import { likeBlog } from '../store/reducers/blogSlice';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLike = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(likeBlog(blog.id));
  }, [dispatch, blog.id]);

  const handleCardClick = useCallback(() => {
    navigate(`/blog/${blog.id}`);
  }, [navigate, blog.id]);

  return (
    <Card 
      className="mb-4 shadow-sm" 
      onClick={handleCardClick} 
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <Card.Img 
        variant="top" 
        src={blog.imageUrl} 
        alt={blog.title} 
        style={{ height: '250px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title className="h5">{blog.title}</Card.Title>
        <Card.Text>{blog.body.length > 100 ? `${blog.body.slice(0, 100)}...` : blog.body}</Card.Text>
        <Button variant="primary" onClick={handleLike}>
          ❤️ Like ({blog.likes})
        </Button>
      </Card.Body>
    </Card>
  );
};

// ✅ React.memo wrapping here
export default React.memo(BlogCard);
