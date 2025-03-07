import { SafeAreaView, View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Search from './Search';
import * as Haptics from 'expo-haptics';
import { fetchCategories } from '../src/api/categories'

interface CategoryProps {
  title: string;
  icon: string;
}

interface Props {
  onCategoryChanged: (category: string) => void;
}

const HomeHeader = ({ onCategoryChanged }: Props) => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        const mappedCategories = data.map((category: CategoryProps) => ({
          title: category.title,
          icon: category.icon,
        }));
        setCategories(mappedCategories);
      } catch (e) {
        console.error(e, 'error');
      }
    };

    getCategories();
  }, []);

  const scrollRef = useRef<ScrollView | null>(null);
  const categoriesRef = useRef<Array<TouchableOpacity | null>>([]);

  const [activeCategory, setActiveCategory] = useState(1);

  const selectCategory = (index: number) => {
    const selected = categoriesRef.current[index];
    setActiveCategory(index);


    selected?.measure((x: number) => {
      scrollRef.current?.scrollTo({ x: x -16, y: 0, animated: true });
    })

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].title);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={ styles.container }>
        <View style={styles.actionRow}>
          <Search />

          <TouchableOpacity style={styles.filterBtn}>
            <AntDesign name="filter" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 30 ,gap: 30, paddingHorizontal: 16, alignItems: 'center' }}>
          {categories.map((category, index) => (
            <TouchableOpacity
              onPress={() => selectCategory(index)}
              key={index}
              ref={(el) => (categoriesRef.current[index] = el)}
              style={index === activeCategory ? styles.categoryBtnActive : styles.categoryBtn}>
              <FontAwesome
                name={category.icon as any}
                size={20}
                color={index === activeCategory ? 'tomato' : 'gray'}
              />
              <Text style={index === activeCategory ? styles.categoryBtnTextActive : styles.categoryBtnText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 130,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: '#000',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  filterBtn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  categoryBtn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoryBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'tomato',
  },
  categoryBtnText: {
    fontWeight: 600,
  },
  categoryBtnTextActive: {
    fontWeight: 600,
    color: 'tomato',
  }
})
