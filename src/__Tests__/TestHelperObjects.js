const connection = {
    user_id:2,
    username:"TestConn",
    bio:"Connection To Test1",
    follow_count:1,
    follower_count:1,
    avatar_pic_url:"some pic route",
}

const user = {
    user_id:1,
    username:"Test1",
    bio:"Hi! Im Test1",
    follow_count:0,
    follower_count:0,
    trip_count:1,
    avatar_pic_url:"some pic route",
    member_status:false,
    followers:[{
        user_id:2,
        username:"TestConn",
        bio:"Connection To Test1",
        follow_count:1,
        follower_count:1,
        avatar_pic_url:"some pic route",
    }],
    following:[{
        user_id:2,
        username:"TestConn",
        bio:"Connection To Test1",
        follow_count:1,
        follower_count:1,
        avatar_pic_url:"some pic route",
    }],
    liked_trips:[1],
}

const trip = {
    trip_id:1,
    start_point:"Grand Rapids",
    end_point:"Mackinaw City",
    waypoint_names:["The Leonard At Logan House","Tru By Hilton Grand Rapids Airport","Whispering Waters B & B"],
    photo:{"attribution": "https://maps.google.com/maps/contrib/101602163491557332420", "img_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&maxheight=300&photoreference=Aap_uEAcABGaNC12R6jbBdUFgnBZElfHDYCTtD6Z2rDPRQH-ZBmNfBqA-SfzXVDHeNJpvB9s_nNKkaH4cM-QqWkzGiX8Cbwl5hKfc0H0lCGMkP5fy151S-twKvmLYlWv6khDlWB-46Ma1tmGn0e2K_ksg6GCLHSIGI6tiGW1AU-1eL0QFJ1o&key=AIzaSyCjXBkeGKHmGE6k4iXPddI-2ye-OXZ8k30"},
    like_count:0,
    user_id:1,
    username:"Test1",
    avatar_pic_url:"some pic route",
}

const message1 = {
    fromUserId:1,
    toUserId:2,
    msgTxt:"Hello From Test1",
    fromUserAvatar:"some pic route",
}



export {user,trip,connection,message1};