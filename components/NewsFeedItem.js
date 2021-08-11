import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import _ from "lodash";
import { formatAuthor, formatDate, getThumbnailURL, itemize, normalize } from '../helpers/format';
import { Fonts, Margins, Alignments, FontSizes } from '../constants';

const {width, height} = Dimensions.get('window');

export default function NewsFeedItem(props) {

  // Handles clicking on items
  const toPost = () => {
    props.onPress();
  }

  const toAuthor = (authorID) => {
    props.onAuthor(authorID);
  }  


    // const { item, index, slideIndex, isFeatured } = this.props;
    let groupLength = props.item.tsdAuthors.length
    let { postTitle } = props.item;
    const thumbnailURL = getThumbnailURL(props.item);
    const full = 0.92*width;
    return (
      <TouchableWithoutFeedback onPress={toPost.bind(this)}>
        <View style={props.isFeatured && props.index === 0 ? styles.homeContent
        : props.isFeatured && props.index === 1 ? {...styles.homeContent, ...{width: width}}
        : props.isFeatured && props.index === 2 ? {...styles.homeContent, ...{}}
        : styles.content            
          }>
            {thumbnailURL && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: thumbnailURL }} style={props.isFeatured && props.index > 0 ? {...styles.image, ...{width: full}}: props.isFeatured && props.index === 2 ? {...styles.image, ...{marginLeft:20}} : !props.isFeatured ? {...styles.image, ...{width: full}} : {...styles.image, ...{}}} borderRadius={8} />
            </View>) // need to find a way to switch to normal styling for lists when it's not homes screen
          }
          {/* <HTML containerStyle={styles.titleContainer} baseFontStyle={styles.titleFont} html={postTitle} /> */}
        <Text style={styles.titleContainer} adjustsFontSizeToFit minimumFontScale={0.75} allowFontScaling numberOfLines={3}>{postTitle}</Text> 
          <View>

              <Text style={{flexDirection: 'row'}, styles.author}>
              {props.item.tsdAuthors.map(t => <TouchableWithoutFeedback onPress = {() => this.toAuthor(t.id)}><Text>{t.displayName.toUpperCase()}</Text></TouchableWithoutFeedback>).reduce((prev, curr, ind) => [prev, ind === groupLength - 1 ? ' and ' : ', ', curr])} on {formatDate(props.item)}
              </Text>
            
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  
}

const styles = ({
    content: {
        // backgroundColor: THEME.BACKGROUND,
        width: '100%',
        paddingTop: 12,
      },
      homeContent: {
        // backgroundColor: THEME.BACKGROUND,
        width: 0.92*width,
        paddingVertical: 12,
        marginLeft: 0,
        marginRight: 0,
      },
      dateAndAuthor: {
        flexDirection: Alignments.row,
        justifyContent: Alignments.spaceBetween,
        marginTop: Margins.default,
        marginHorizontal: Margins.articleSides,
      },
  
      author: {
        fontFamily: Fonts.openSans,
        fontSize: FontSizes.small,
        marginLeft: 0,
        // color: THEME.SECONDARY_LABEL,
      },
  
      date: {
        fontFamily: Fonts.openSans,
        fontSize: FontSizes.small,
        // color: THEME.SECONDARY_LABEL,
      },
  
      titleFont: {
        fontFamily: Fonts.PTSerifBold,
        fontSize: FontSizes.large,
        // color: THEME.LABEL
      },
      titleContainer: {
        marginTop: Margins.defaultSmall,
        marginHorizontal: Margins.articleSides,
        fontFamily: Fonts.PTSerifBold,
        fontSize: normalize(FontSizes.large),
        // color: THEME.LABEL
      },
  
      homeTitleContainer: {
        marginTop: Margins.defaultSmall,
        marginLeft: Margins.articleSides,
        width: width - (2 * Margins.articleSides) - 2*Margins.defaultLarge,
        fontFamily: Fonts.PTSerifBold,
        fontSize: normalize(FontSizes.large),
        // color: THEME.LABEL,
      },
      elongatedHomeTitleContainter: {
        marginTop: Margins.defaultSmall,
        marginLeft: Margins.articleSides,
        width: width - (2 * Margins.articleSides) - Margins.defaultLarge,
        fontFamily: Fonts.PTSerifBold,
        fontSize: normalize(FontSizes.large),
        // color: THEME.LABEL,
      },
      descriptionContainer: {
        opacity: 0.80,
        marginHorizontal: Margins.articleSides
      },
      descriptionFont: {
        fontSize: FontSizes.mediumSmall
      },
  
      image: {
        width: 0.95*width - (2 * Margins.articleSides),
        height: width/2.125,
        marginHorizontal: Margins.articleSides,
        marginBottom: Margins.default,
      },
  
      homeImage: {
        width: width - (2 * Margins.articleSides) - Margins.defaultLarge,
        height: width/2.125,
        marginLeft: Margins.articleSides,
        marginRight: 0,
        marginBottom: Margins.default
      },
  
      elongatedHomeImage: {
        width: width - (2 * Margins.articleSides) - Margins.defaultLarge,
        height: width/2.125,
        marginLeft: Margins.articleSides,
        marginRight: Margins.articleSides,
        marginBottom: Margins.default
      },
  
      endHomeImage: {
  
      },
  
      imageContainer: {
  
      },
      searchContainer: {
        // borderBottomColor: COLORS.LIGHT_GRAY,
        borderBottomWidth: 1,
        // backgroundColor: COLORS.NEAR_WHITE,
        width: '100%',
        flexDirection: Alignments.row,
        maxHeight: 122
      },
      searchContent: {
        flexDirection: Alignments.column,
        width: width - 120,
        marginLeft: Margins.default,
        marginRight: Margins.default,
      },
      searchImage: {
        width: 120,
        height: 120,
      },
      searchDateAndAuthor: {
        flexDirection: Alignments.row,
        justifyContent: Alignments.spaceBetween,
        marginTop: 2,
      },
      searchTitle: {
        fontFamily: Fonts.PTSerifBold,
        fontSize: 14,
        marginTop: 2,
      },
      searchDescription: {
        fontFamily: Fonts.PTSerif,
        fontSize: 12,
        marginTop: 2,
        opacity: 0.80,
      },
})