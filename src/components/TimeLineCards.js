import React from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { fonts } from '../constants/fonts'
import { LikesNotifIcon } from './Svgs'




export const ReviewedHappeningTimeLine = ({ containerStyle, cardTitle, title, reviewText, reviewDesc }) => (
    <TouchableOpacity activeOpacity={0.9} style={[{ width: "100%" }, containerStyle]}>
        <View style={{ marginLeft: 44, paddingHorizontal: 15, paddingVertical: 15, backgroundColor: 'white', elevation: 2, borderRadius: 20, shadowColor: 'rgb(0,0,0,0.77)', shadowOpacity: 0.1, shadowOffset: { width: 0.5, height: 0.5 }, marginTop: 10 }}>
            <Text style={[styles.cardTitle]}>{cardTitle}</Text>
            <Text style={styles.headingTitle}>{title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, width: "100%", justifyContent: 'space-between', marginLeft: -4 }}>
                <View style={{ flexDirection: 'row', }}>
                    {
                        [1, 2, 3, 4, 5].map((v, i) => (
                            <View style={i == 4 ? styles.ratingCircleInActive : styles.ratingCircleActive}></View>
                        ))
                    }
                </View>
                <Text style={[styles.rattingText, { fontSize: 6, fontFamily: fonts.MBo }]}>{"52 MIN AGO"}</Text>
            </View>
            <View style={[styles.seperator, { marginLeft: 0, width: "100%", marginTop: 12, marginBottom: 12 }]}></View>

            <Text style={[styles.headingTitle, { fontSize: 10, }]}>{reviewText}</Text>
            <Text style={[styles.notifDesc, { width: "90%", }]}>{reviewDesc}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                <LikesNotifIcon />
                <Text style={{ fontFamily: fonts.MSBo, fontSize: 11, color: '#222222', marginLeft: 5 }}>271</Text>
            </View>

        </View>
    </TouchableOpacity>
)

export const SubmitHappeningTimeLine = ({ containerStyle }) => (
    <TouchableOpacity activeOpacity={0.9} style={[{ width: "100%" }, containerStyle]}>
        <View style={{ marginLeft: 44, paddingHorizontal: 15, paddingVertical: 15, backgroundColor: 'white', elevation: 2, borderRadius: 20, shadowColor: 'rgb(0,0,0,0.77)', shadowOpacity: 0.1, shadowOffset: { width: 0.5, height: 0.5 }, marginTop: 10 }}>
            <Text style={[styles.cardTitle]}>{"Submitted a Happening"}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, width: "100%", justifyContent: 'space-between', marginLeft: -4 }}>
                <Text style={[styles.headingTitle, { width: "80%" }]}>Restore coral reefs in open sea</Text>
                <Text style={[styles.rattingText, { fontSize: 6, fontFamily: fonts.MBo }]}>{"52 MIN AGO"}</Text>
            </View>
            <View style={[styles.seperator, { marginLeft: 0, width: "100%", marginTop: 12, marginBottom: 12 }]}></View>

            <Image
                style={{ width: "70%", height: 119, alignSelf: 'center', borderRadius: 20 }}
                source={require('../static_assets/image.png')}
            />

        </View>
    </TouchableOpacity>
)


export const AddedPhotosTimeLine = ({ containerStyle }) => (
    <TouchableOpacity activeOpacity={0.9} style={[{ width: "100%" }, containerStyle]}>
        <View style={{ marginLeft: 44, paddingHorizontal: 15, paddingVertical: 15, backgroundColor: 'white', elevation: 2, borderRadius: 20, shadowColor: 'rgb(0,0,0,0.77)', shadowOpacity: 0.1, shadowOffset: { width: 0.5, height: 0.5 }, marginTop: 10 }}>
            <Text style={[styles.cardTitle]}>{"Added photos to"}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, width: "100%", justifyContent: 'space-between', marginLeft: -4 }}>
                <Text style={[styles.headingTitle, { width: "80%" }]}>Fishing Line Cleanup</Text>
                <Text style={[styles.rattingText, { fontSize: 6, fontFamily: fonts.MBo }]}>{"4 HRS AGO"}</Text>
            </View>
            <View style={[styles.seperator, { marginLeft: 0, width: "100%", marginTop: 12, marginBottom: 12 }]}></View>
            <View style={{ flexDirection: 'row', }}>
                <Image
                    style={{ width: "67%", height: 124, alignSelf: 'center', borderRadius: 5 }}
                    source={require('../static_assets/image.png')}
                />
                <View style={{ width: "30%", marginLeft: "3%" }}>
                    <Image
                        style={{ width: "100%", height: 119 / 2, alignSelf: 'center', borderRadius: 5, }}
                        source={require('../static_assets/p2.png')}
                    />
                    <Image
                        style={{ width: "100%", height: 119 / 2, alignSelf: 'center', borderRadius: 5, marginTop: 5 }}
                        source={require('../static_assets/p3.png')}
                    />
                </View>
            </View>

        </View>
    </TouchableOpacity>
)

export const EditBioSkillsTimeLine = ({ containerStyle, title, desc }) => (
    <TouchableOpacity activeOpacity={0.9} style={[{ width: "100%" }, containerStyle]}>
        <View style={{ marginLeft: 44, paddingHorizontal: 10, paddingVertical: 15, paddingBottom: 25, backgroundColor: 'white', elevation: 2, borderRadius: 20, shadowColor: 'rgb(0,0,0,0.77)', shadowOpacity: 0.1, shadowOffset: { width: 0.5, height: 0.5 }, marginTop: 10 }}>
            <Text style={[styles.cardTitle]}>{title}</Text>
            <View style={[styles.seperator, { marginLeft: 0, width: "100%", marginTop: 12, marginBottom: 12 }]}></View>
            <Text style={[styles.notifDesc, { width: "90%", }]}>{desc}</Text>
        </View>
    </TouchableOpacity>
)

export const LiveHappeningTimeLine = ({ containerStyle, cardTitle, title, }) => (
    <TouchableOpacity activeOpacity={0.9} style={[{ width: "100%" }, containerStyle]}>
        <View style={{ marginLeft: 44, paddingHorizontal: 15, paddingVertical: 15, backgroundColor: 'white', elevation: 2, borderRadius: 20, shadowColor: 'rgb(0,0,0,0.77)', shadowOpacity: 0.1, shadowOffset: { width: 0.5, height: 0.5 }, marginTop: 10 }}>
            <Text style={[styles.cardTitle, { width: "80%" }]}>{cardTitle}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, width: "100%", justifyContent: 'space-between', marginLeft: -4 }}>
                <Text style={[styles.headingTitle, { width: "80%" }]}>{title}</Text>
                <View style={{ flexDirection: 'row',alignItems:'center' }}>
                    <Text style={{ fontFamily: fonts.MSBo, fontSize: 7, color: '#222222' }}>LIVE</Text>
                    <View style={{ width: 7, height: 7, borderRadius: 7 / 2, backgroundColor: '#5EBC4D',marginLeft:5 }} />
                </View>
            </View>
            <View style={[styles.seperator, { marginLeft: 0, width: "100%", marginTop: 12, marginBottom: 12 }]}></View>

            <Image
                style={{ width: "70%", height: 119, alignSelf: 'center', borderRadius: 20 }}
                source={require('../static_assets/image.png')}
            />

        </View>
    </TouchableOpacity>
)

export const UpdatedPhotoTimeLine = ({ containerStyle, title, desc }) => (
    <TouchableOpacity activeOpacity={0.9} style={[{ width: "100%" }, containerStyle]}>
        <View style={{ marginLeft: 44, paddingHorizontal: 10, paddingVertical: 15, paddingBottom: 25, backgroundColor: 'white', elevation: 2, borderRadius: 20, shadowColor: 'rgb(0,0,0,0.77)', shadowOpacity: 0.1, shadowOffset: { width: 0.5, height: 0.5 }, marginTop: 10 }}>
            <Text style={[styles.cardTitle]}>{"Updated her"}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={[styles.headingTitle]}>{"Profile Picture"}</Text>
                <Text style={[styles.rattingText, { fontSize: 6, fontFamily: fonts.MBo }]}>{"52 MIN AGO"}</Text>
            </View>
            <View style={[styles.seperator, { marginLeft: 0, width: "100%", marginTop: 12, marginBottom: 12 }]}></View>
            <Image
                style={{width:102,height:102,borderRadius:102/2,marginTop:10,alignSelf:'center'}}
                source={require('../static_assets/profileLarge.png')}
            />
        </View>
    </TouchableOpacity>
)





const styles = StyleSheet.create({

    headingName: { fontFamily: fonts.PSBo, fontSize: 12, color: '#35208E', marginTop: 5 },
    cardTitle: { fontFamily: fonts.PSBo, fontSize: 12, color: '#5B4DBC' },
    headingTitle: { fontFamily: fonts.PSBo, fontSize: 12, color: '#222222' },
    time: { fontFamily: fonts.MBo, fontSize: 9, color: '#AAAAAA' },
    notifPrimaryImg: { width: 44, height: 44, borderRadius: 22 },
    notifSecondaryImg: { width: 66, height: 57, borderRadius: 22, resizeMode: 'stretch', marginLeft: 10 },
    notifDesc: { fontFamily: fonts.MSBo, fontSize: 12, color: '#888888', marginTop: 5, lineHeight: 18 },
    ratingCircleActive: { width: 6, height: 6, backgroundColor: '#331F8B', borderRadius: 6 / 2, marginLeft: 4 },
    ratingCircleInActive: { width: 6, height: 6, backgroundColor: 'rgba(51, 31, 138, 0.4)', borderRadius: 6 / 2, marginLeft: 4 },
    rattingText: { fontFamily: fonts.MSBo, fontSize: 12, color: '#222222', marginLeft: 10 },
    seperator: { width: "88%", height: 2, backgroundColor: 'rgba(34,34,34,0.10)', marginTop: 20, marginLeft: 44, marginBottom: 10 }

})
