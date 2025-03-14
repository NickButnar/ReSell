import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchPosts } from '../../src/api/post';
import { useFocusEffect } from '@react-navigation/native';

interface Post {
  id: number;
  title: string;
  description: string;
  category: {
    id: number;
    title: string;
  };
  subcategory: {
    id: number;
    title: string;
  };
}

interface HomeProps {
  category: string;  // Категория, по которой будет фильтрация
}

const Home = ({ category }: HomeProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);  // Состояние для отфильтрованных данных
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const posts = await fetchPosts();
      setPosts(posts);  // Загружаем все посты
    } catch (e) {
      console.error('Error loading posts:', e);
    } finally {
      setLoading(false);
    }
  };

  // Фильтруем данные по выбранной категории
  useEffect(() => {
    if (category) {
      setFilteredPosts(posts.filter((post) => post.category.title === category));  // Фильтруем посты по категории
    }
  }, [category, posts]);  // Обновляем фильтрацию при изменении категории или списка постов

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      loadPosts();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const posts = await fetchPosts();
      setPosts(posts);
    } catch (e) {
      console.error('Error loading posts:', e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 200, padding: 16 }}>
      {loading ? (
        <ActivityIndicator size="large" color="tomato" />
      ) : (
        filteredPosts.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredPosts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.post}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text>{item.category.title}</Text>
                <Text>{item.subcategory.title}</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <Text>No posts available</Text>
        )
      )}
    </View>
  );
};

const styles = {
  post: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold' as 'bold',
    marginBottom: 8,
  }
};

export default Home;
