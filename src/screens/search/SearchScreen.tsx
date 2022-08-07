import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import fonts from '@navdeep/utils/fonts'
import { vw, vh } from '@navdeep/utils/dimensions'
import screenNames from '@navdeep/utils/screenNames'
import SearchComponent from '@navdeep/components/SearchComponent'
import { getBrowseCategoriesList } from '@navdeep/actions'
import { useDispatch } from 'react-redux'
import MiniPlayer from '@navdeep/components/MiniPlayer'

export default function Search(props: any) {

  const dispatch = useDispatch()
  const [categoriesList, setcategoriesList] = useState<any>([])

  useEffect(() => {
    let payload = { limit: 40 }
    //@ts-ignore
    dispatch(getBrowseCategoriesList(payload, (data: any) => {
      setcategoriesList(data?.categories?.items)
    }))
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
        <View style={{ paddingHorizontal: vw(20) }}>
          <Text style={styles.screenHeading}>Search</Text>
          <View style={{ paddingBottom: vh(10), backgroundColor: '#121212', }}>
            <SearchComponent onPressSearch={() => props?.navigation?.navigate(screenNames.MAIN_SEARCH_SCREEN)} />
          </View>
          <Text style={styles.screenSubHeading}>Browse all</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: vh(100) }}>
            {
              categoriesList?.map((item: any) => {
                return (
                  <CategoryCard
                    title={item?.name ?? ''}
                    icon={item?.icons?.[0]?.url ?? ''}
                  />
                )
              })
            }
          </View>
        </View>
      </ScrollView>
      {/* <MiniPlayer /> */}
    </View>
  )
}

const CategoryCard = (props: any) => {
  return (
    <TouchableOpacity style={[styles.cardView, { backgroundColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16) }]}>
      <Text style={styles.cardTitleText} numberOfLines={2}>{props?.title}</Text>
      <Image
        source={{ uri: props?.icon }}
        style={styles.cardImage}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  screenHeading: {
    marginTop: vh(25),
    fontSize: vw(24),
    fontFamily: fonts.BOLD,
    color: 'white',
    marginBottom: vh(18)
  },
  screenSubHeading: {
    fontSize: vw(16),
    fontFamily: fonts.BOLD,
    color: 'white',
    marginVertical: vh(18)
  },
  cardView: {
    backgroundColor: 'pink',
    height: vh(100),
    width: '47.5%',
    marginBottom: vh(22),
    borderRadius: vw(5)
  },
  cardTitleText: {
    fontSize: vw(16),
    fontFamily: fonts.BOLD,
    color: 'white',
    marginLeft: vw(8),
    marginTop: vh(10),
    maxWidth: vw(80)
  },
  cardImage: {
    width: vw(65),
    height: '100%',
    borderRadius: vw(5),
    alignSelf: 'flex-end',
    marginRight: vw(10),
    position: 'absolute',
    bottom: 0,
    opacity: 0.8

  }
})