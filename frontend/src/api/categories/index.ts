import api from '../axios'

export const fetchCategories = async () => {
  try {
    const response  = await api.get('/categories')
    return response.data
  } catch(e) {
    console.error(e, 'error')
  }
}
