import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { fonts } from '../constants/fonts'
import { LikesNotifIcon } from './Svgs';
import { getTimeAgo } from '../utils/functions';





export const ReviewedHappening = () => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                <Image
                    source={require('../static_assets/p6.png')}
                    style={styles.notifPrimaryImg}
                />
                <View style={{ marginLeft: 10, width: "60%", }}>
                    <Text style={styles.time}>2 HOURS AGO</Text>
                    <Text style={[styles.headingName]}>Sara Parker <Text style={styles.headingTitle}>reviewed your happening happening</Text></Text>
                </View>
                <Image
                    source={require('../static_assets/image.png')}
                    style={styles.notifSecondaryImg}
                />
            </View>
            <View style={{ marginLeft: 44, paddingHorizontal: 15, paddingVertical: 15, backgroundColor: 'white', elevation: 2, borderRadius: 20, shadowColor: 'rgb(0,0,0,0.77)', shadowOpacity: 0.1, shadowOffset: { width: 0.5, height: 0.5 }, marginTop: 10 }}>
                <Text style={[styles.headingTitle, { fontSize: 13 }]}>Awesome Experience !</Text>
                <Text style={[styles.notifDesc, { width: "70%" }]}>Nunc justo eros, vehicula vel vehicula ut, lacinia a erat. Nam fringilla eros...</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    {
                        [1, 2, 3, 4, 5].map((v, i) => (
                            <View style={i == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
                        ))
                    }
                    <Text style={styles.rattingText}>34 Ratings</Text>
                </View>
            </View>
            <View style={styles.seperator}></View>

        </TouchableOpacity>
    )
}


export const LikedYourReview = ({
    headingName = "Daria Boskani", ago = "1 HOUR AGO", title = "liked your review", primaryImage, secendoryImage,
    reviewText = "Awesome Experience !", reviewDesc = "Nunc justo eros, vehicula vel vehicula ut, lacinia a erat. Nam fringilla eros...",
    likes = "271", happeningTitle = "Fishing Line Cleanup", seperator = true

}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                <Image
                    source={primaryImage ? { uri: secendoryImage } : require('../static_assets/p6.png')}
                    style={styles.notifPrimaryImg}
                />
                <View style={{ marginLeft: 10, width: "60%", }}>
                    <Text style={styles.time}>{ago}</Text>
                    <Text style={[styles.headingName]}>{headingName} <Text style={styles.headingTitle}>{title}</Text></Text>
                </View>
            </View>
            <View style={{ marginLeft: 44, paddingHorizontal: 15, paddingVertical: 15, backgroundColor: 'white', elevation: 2, borderRadius: 20, shadowColor: 'rgb(0,0,0,0.77)', shadowOpacity: 0.1, shadowOffset: { width: 0.5, height: 0.5 }, marginTop: 10 }}>
                <Text style={[styles.headingTitle, { fontSize: 13 }]}>{happeningTitle}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, width: "100%", justifyContent: 'space-between', marginLeft: -4 }}>
                    <View style={{ flexDirection: 'row', }}>
                        {
                            [1, 2, 3, 4, 5].map((v, i) => (
                                <View style={i == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
                            ))
                        }
                    </View>
                    <Text style={[styles.rattingText, { fontSize: 9, fontFamily: fonts.MBo }]}>{"52 MIN AGO"}</Text>
                </View>
                <View style={[styles.seperator, { marginLeft: 0, width: "100%", marginTop: 12, marginBottom: 12 }]}></View>

                <Text style={[styles.headingTitle, { fontSize: 13, }]}>{reviewText}</Text>
                <Text style={[styles.notifDesc, { width: "90%", }]}>{reviewDesc}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                    <LikesNotifIcon />
                    <Text style={{ fontFamily: fonts.MSBo, fontSize: 11, color: '#222222', marginLeft: 5 }}>271</Text>
                </View>

            </View>
            {seperator && <View style={styles.seperator}></View>}

        </TouchableOpacity>
    )
}

export const SentYouRequestNotif = ({
    headingName = "Daria Boskani", ago = "1 HOUR AGO", title = "liked your review", primaryImage, secendoryImage,
    seperator = true

}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                <Image
                    source={primaryImage ? { uri: secendoryImage } : require('../static_assets/notifImg1.png')}
                    style={styles.notifPrimaryImg}
                />
                <View style={{ marginLeft: 10, width: "60%", }}>
                    <Text style={styles.time}>{ago}</Text>
                    <Text style={[styles.headingName]}>{headingName} <Text style={styles.headingTitle}>{title}</Text></Text>
                </View>
                <Image
                    source={require('../static_assets/image.png')}
                    style={styles.notifSecondaryImg}
                />
            </View>
            {seperator && <View style={styles.seperator}></View>}

        </TouchableOpacity>
    )
}


export const EditHappeningNotif = ({
    headingName = "Daria Boskani", ago = "1 HOUR AGO", title = "liked your review", primaryImage, secendoryImage,
    seperator = true

}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                <Image
                    source={primaryImage ? { uri: secendoryImage } : require('../static_assets/notifImg1.png')}
                    style={styles.notifPrimaryImg}
                />
                <View style={{ marginLeft: 10, width: "60%", }}>
                    <Text style={styles.time}>{ago}</Text>
                    <Text style={[styles.headingName]}>{headingName} <Text style={styles.headingTitle}>{title}</Text></Text>
                </View>
                <Image
                    source={require('../static_assets/image.png')}
                    style={styles.notifSecondaryImg}
                />
            </View>
            {seperator && <View style={styles.seperator}></View>}

        </TouchableOpacity>
    )
}


export const AcceptedJoinRequestNotif = ({
    headingName = "Daria Boskani", ago = "1 HOUR AGO", title = "liked your review", primaryImage, secendoryImage,
    seperator = true

}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                <Image
                    source={primaryImage ? { uri: secendoryImage } : require('../static_assets/notifImg1.png')}
                    style={styles.notifPrimaryImg}
                />
                <View style={{ marginLeft: 10, width: "60%", }}>
                    <Text style={styles.time}>{ago}</Text>
                    <Text style={[styles.headingName]}>{headingName} <Text style={styles.headingTitle}>{title}</Text></Text>
                </View>
                <Image
                    source={require('../static_assets/image.png')}
                    style={styles.notifSecondaryImg}
                />
            </View>
            {seperator && <View style={styles.seperator}></View>}

        </TouchableOpacity>
    )
}

export const RejectedJoinRequestNotif = ({
    headingName = "Daria Boskani", ago = "1 HOUR AGO", title = "liked your review", primaryImage, secendoryImage,
    seperator = true

}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                <Image
                    source={primaryImage ? { uri: secendoryImage } : require('../static_assets/notifImg1.png')}
                    style={styles.notifPrimaryImg}
                />
                <View style={{ marginLeft: 10, width: "60%", }}>
                    <Text style={styles.time}>{ago}</Text>
                    <Text style={[styles.headingName]}>{headingName} <Text style={styles.headingTitle}>{title}</Text></Text>
                </View>
                <Image
                    source={require('../static_assets/image.png')}
                    style={styles.notifSecondaryImg}
                />
            </View>
            {seperator && <View style={styles.seperator}></View>}

        </TouchableOpacity>
    )
}

export const LikedHappeningReview = ({
    headingName = "Daria Boskani", ago = "1 HOUR AGO", title = "liked your review", primaryImage, secendoryImage,
    seperator = true

}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                <Image
                    source={primaryImage ? { uri: secendoryImage } : require('../static_assets/notifImg1.png')}
                    style={styles.notifPrimaryImg}
                />
                <View style={{ marginLeft: 10, width: "60%", }}>
                    <Text style={styles.time}>{ago}</Text>
                    <Text style={[styles.headingName]}>{headingName} <Text style={styles.headingTitle}>{title}</Text></Text>
                </View>
                <Image
                    source={require('../static_assets/image.png')}
                    style={styles.notifSecondaryImg}
                />
            </View>
            {seperator && <View style={styles.seperator}></View>}

        </TouchableOpacity>
    )
}

export const HappeningApprovedNotif = ({
    headingName = "Daria Boskani", ago = "1 HOUR AGO", title = "liked your review", primaryImage, secendoryImage,
    seperator = true

}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                <Image
                    source={primaryImage ? { uri: secendoryImage } : require('../static_assets/notifImg1.png')}
                    style={styles.notifPrimaryImg}
                />
                <View style={{ marginLeft: 10, width: "60%", }}>
                    <Text style={styles.time}>{ago}</Text>
                    <Text style={[styles.headingName]}>{headingName} <Text style={styles.headingTitle}>{title}</Text></Text>
                </View>
                <Image
                    source={require('../static_assets/image.png')}
                    style={styles.notifSecondaryImg}
                />
            </View>
            {seperator && <View style={styles.seperator}></View>}

        </TouchableOpacity>
    )
}

export const HappeningRejectedNotif = ({
    headingName = "Daria Boskani", ago = "1 HOUR AGO", title = "liked your review", primaryImage, secendoryImage,
    seperator = true

}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                <Image
                    source={primaryImage ? { uri: secendoryImage } : require('../static_assets/notifImg1.png')}
                    style={styles.notifPrimaryImg}
                />
                <View style={{ marginLeft: 10, width: "60%", }}>
                    <Text style={styles.time}>{ago}</Text>
                    <Text style={[styles.headingName]}>{headingName} <Text style={styles.headingTitle}>{title}</Text></Text>
                </View>
                <Image
                    source={require('../static_assets/image.png')}
                    style={styles.notifSecondaryImg}
                />
            </View>
            {seperator && <View style={styles.seperator}></View>}

        </TouchableOpacity>
    )
}

export const HappeningBookingCancelledNotif = ({
    headingName = "Daria Boskani", ago = "1 HOUR AGO", title = "liked your review", primaryImage, secendoryImage,
    seperator = true

}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                <Image
                    source={primaryImage ? { uri: secendoryImage } : require('../static_assets/notifImg1.png')}
                    style={styles.notifPrimaryImg}
                />
                <View style={{ marginLeft: 10, width: "60%", }}>
                    <Text style={styles.time}>{ago}</Text>
                    <Text style={[styles.headingName]}>{headingName} <Text style={[styles.headingTitle, { color: '#F52626' }]}>{title}</Text></Text>
                </View>
                <Image
                    source={require('../static_assets/image.png')}
                    style={styles.notifSecondaryImg}
                />
            </View>
            {seperator && <View style={styles.seperator}></View>}

        </TouchableOpacity>
    )
}

export const SomeOneCancelledHappeningBookingNotif = ({
    headingName = "Daria Boskani", ago = "1 HOUR AGO", title = "liked your review", primaryImage, secendoryImage,
    seperator = true

}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                <Image
                    source={primaryImage ? { uri: secendoryImage } : require('../static_assets/notifImg1.png')}
                    style={styles.notifPrimaryImg}
                />
                <View style={{ marginLeft: 10, width: "60%", }}>
                    <Text style={styles.time}>{ago}</Text>
                    <Text style={[styles.headingName]}>{headingName} <Text style={styles.headingTitle}>{title}</Text></Text>
                </View>
                <Image
                    source={require('../static_assets/image.png')}
                    style={styles.notifSecondaryImg}
                />
            </View>
            {seperator && <View style={styles.seperator}></View>}

        </TouchableOpacity>
    )
}

export const SomeOneAddedNewHappening = ({
    headingName = "Daria Boskani", ago = "1 HOUR AGO", title = "liked your review", primaryImage, secendoryImage,
    seperator = true

}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%" }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                <Image
                    source={primaryImage ? { uri: secendoryImage } : require('../static_assets/notifImg1.png')}
                    style={styles.notifPrimaryImg}
                />
                <View style={{ marginLeft: 10, width: "60%", }}>
                    <Text style={styles.time}>{ago}</Text>
                    <Text style={[styles.headingName]}>{headingName} <Text style={styles.headingTitle}>{title}</Text></Text>
                </View>
                <Image
                    source={require('../static_assets/image.png')}
                    style={styles.notifSecondaryImg}
                />
            </View>
            {seperator && <View style={styles.seperator}></View>}

        </TouchableOpacity>
    )
}



export const GernalNotif = ({
    headingName = "Daria Boskani", ago = "1 HOUR AGO", title = "liked your review", primaryImage, secendoryImage,
    seperator = true, data

}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{ width: "100%", }}>
            <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center' }}>
                <Image
                    // source={{ uri: data?.user_profile_image } }
                    source={{ uri: data?.user_profile_image }}
                    style={styles.notifPrimaryImg}
                />
                <View style={{ marginLeft: 10, width: "60%", }}>
                    <Text style={styles.time}>{getTimeAgo(data?.timestamp)}</Text>
                    <Text style={[styles.headingName]}>{data?.user_name} <Text style={styles.headingTitle}>{data?.notif_title}</Text></Text>
                </View>
                <Image
                    source={{ uri: data?.notif_image[0] }}
                    style={styles.notifSecondaryImg}
                />
            </View>
            {seperator && <View style={styles.seperator}></View>}

        </TouchableOpacity>
    )
}






const styles = StyleSheet.create({

    headingName: { fontFamily: fonts.PSBo, fontSize: 12, color: '#35208E', marginTop: 5 },
    headingTitle: { fontFamily: fonts.PSBo, fontSize: 12, color: '#222222' },
    time: { fontFamily: fonts.MBo, fontSize: 9, color: '#AAAAAA' },
    notifPrimaryImg: { width: 44, height: 44, borderRadius: 22 },
    notifSecondaryImg: { width: 66, height: 57, borderRadius: 22, resizeMode: 'stretch', marginLeft: 10 },
    notifDesc: { fontFamily: fonts.MSBo, fontSize: 12, color: '#888888', marginTop: 5, lineHeight: 18 },
    ratingCircleActive: { width: 8, height: 8, backgroundColor: '#331F8B', borderRadius: 8 / 2, marginLeft: 4 },
    ratingCircleInActive: { width: 8, height: 8, backgroundColor: 'rgba(51, 31, 138, 0.4)', borderRadius: 8 / 2, marginLeft: 4 },
    rattingText: { fontFamily: fonts.MSBo, fontSize: 12, color: '#222222', marginLeft: 10 },
    seperator: { width: "88%", height: 2, backgroundColor: 'rgba(34,34,34,0.10)', marginTop: 20, marginLeft: 44, marginBottom: 10 }

})

