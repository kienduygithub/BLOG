import customAxios from '../customize/axios';

export const postSinglePost = async (data) => {
    const response = await customAxios.post('/post/post-blog', data);
    return response.data;
}

export const getAllPosts = async (category) => {
    const response = await customAxios.get(`/post/get-all-posts${ category }`);
    return response.data;
}

export const getSinglePost = async (postId, access_token) => {
    const response = await customAxios.get(`/post/get-single-post/?id=${ postId }`, {
        headers: {
            Authorization: `Bearer ${ access_token }`
        }
    });
    return response.data;
}

export const deleteSinglePost = async (postId) => {
    const response = await customAxios.delete(`/post/delete-single-post/?id=${ postId }`);
    return response.data;
}

export const editSinglePost = async (data) => {
    const response = await customAxios.put('/post/edit-single-post', data);
    return response.data;
}