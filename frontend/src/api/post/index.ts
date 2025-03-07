import api from '../axios';

interface PostData {
  title: string;
  description: string;
  category_id: number;
  subcategory_id: number;
}

export const createPost = async (postData: PostData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const fetchPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error loading posts:', error);
    throw error;
  }
}
