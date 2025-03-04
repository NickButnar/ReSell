import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createPost } from '../../src/api/post';
import { fetchCategories } from '../../src/api/categories';

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');
  const [subcategoryTitle, setSubcategoryTitle] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        if (data.length > 0) {
          setCategoryTitle(data[0].title);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  // Update subcategories when category changes
  useEffect(() => {
    const category = categories.find((cat) => cat.title === categoryTitle);
    if (category) {
      setSubcategories(category.subcategories);
      setSubcategoryTitle(category.subcategories[0]?.title || '');
    }
  }, [categoryTitle, categories]);

  const handleCreatePost = async () => {
    if (!title || !description || !categoryTitle || !subcategoryTitle) {
      Alert.alert('Error', 'Fill all fields');
      return;
    }

    try {
      const category = categories.find((cat) => cat.title === categoryTitle);
      const subcategory = category?.subcategories.find((sub: any) => sub.title === subcategoryTitle);

      const postData = {
        title,
        description,
        category_title: categoryTitle,
        subcategory_title: subcategoryTitle,
        category_id: category?.id,
        subcategory_id: subcategory?.id,
      };
      await createPost(postData);
      Alert.alert('Success', 'Post created successfully');

      setTitle('');
      setDescription('');
      setCategoryTitle('');
      setSubcategoryTitle('');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 30, padding: 16 }}>

        <View style={styles.formItem}>
          <Text style={styles.label}>Name</Text>
          <TextInput value={title} onChangeText={setTitle} style={styles.input} />
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            multiline={true}
            numberOfLines={10}
            onChangeText={setDescription}
            style={styles.areaInput}
          />
        </View>


        <View style={styles.formItem}>
          <Text style={styles.label}>Category</Text>
          <Picker
            selectedValue={categoryTitle}
            onValueChange={(itemValue) => setCategoryTitle(itemValue)}
            style={styles.input}>
            {categories.map((category) => (
              <Picker.Item key={category.id} label={category.title} value={category.title} />
            ))}
          </Picker>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Subcategory</Text>
          <Picker
            selectedValue={subcategoryTitle}
            onValueChange={(itemValue) => setSubcategoryTitle(itemValue)}
            style={styles.input}>
            {subcategories.map((subcategory) => (
              <Picker.Item key={subcategory.id} label={subcategory.title} value={subcategory.title} />
            ))}
          </Picker>
        </View>

        <View style={styles.submitBtn}>
          <TouchableOpacity onPress={handleCreatePost}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Create Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  formContainer: {
    flex: 1,
    flexDirection: 'column' as 'column',
    gap: 16,
    padding: 16
  },
  formItem: {
    flex: 1,
    flexDirection: 'column' as 'column',
    gap: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'medium' as 'medium',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  areaInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    height: 100
  },
  submitBtn: {
    backgroundColor: 'tomato',
    color: 'white',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 20,
  }
};

export default CreatePostScreen;
