import {v1} from "uuid";

//UI

export const store = {
  _state: {
    profilePage: {
      newMessage: 'BlaBlaBla',
      networkData: {
        logo: '',
        background: "https://junior3d.ru/texture/%D0%9F%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0/%D0%9F%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D1%8B%D0%9B%D0%B0%D0%BD%D0%B4%D1%88%D0%B0%D1%84%D1%82%D0%B0/%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D1%8B-%D0%BB%D0%B0%D0%BD%D0%B4%D1%88%D0%B0%D1%84%D1%82%D0%B0_62.jpg",
        navBar: ""
      },
      profileInfoData: {
        content: "Ava + Discription",
        backgroundImg: "https://junior3d.ru/texture/%D0%9F%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0/%D0%9F%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D1%8B%D0%9B%D0%B0%D0%BD%D0%B4%D1%88%D0%B0%D1%84%D1%82%D0%B0/%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D1%8B-%D0%BB%D0%B0%D0%BD%D0%B4%D1%88%D0%B0%D1%84%D1%82%D0%B0_62.jpg",
      },
      arrayMyPosts: [
        {
          id: v1(),
          avatar: "https://www.anypics.ru/download.php?file=201210/1440x900/anypics.ru-5910.jpg",
          message: "Hi",
          amount: 5
        },
        {
          id: v1(),
          avatar: "https://www.anypics.ru/download.php?file=201210/1440x900/anypics.ru-5910.jpg",
          message: "How are you?",
          amount: 3
        },
        {
          id: v1(),
          avatar: "https://www.anypics.ru/download.php?file=201210/1440x900/anypics.ru-5910.jpg",
          message: "Fine",
          amount: 4
        },
      ],
    },
    dialogsPage: {
      dialogsData: [
        { id: v1(), name: "Dimych" },
        { id: v1(), name: "Andrey" },
        { id: v1(), name: "Sveta" },
        { id: v1(), name: "Sasha" },
        { id: v1(), name: "Victor" },
        { id: v1(), name: "Valera" },
      ],
      messageData: [
        { id: v1(), message: "Hi" },
        { id: v1(), message: "How" },
        { id: v1(), message: "Fine" },
      ],
      newMessageBody: "LaLalA"
    },
    friend: [
      {id: v1(), avatar: "https://img1.goodfon.ru/original/1920x1172/4/bc/kunfu-panda-2-multfilm.jpg", name: "Viktor"},
      {id: v1(), avatar: "https://shutniki.club/wp-content/uploads/2020/01/smeshnye_avatarki_34_17105705.jpg", name: "Dima"},
      {id: v1(), avatar: "https://yandex-images.naydex.net/NQvb96385/bc04c3hdhXu/Kn883ud1u_Wg6V0qj0LyZMf8dwOfqlxQUQSKy_15QB2k4uyiTudpD3tUVNbbHlCyGLUcwTFPtfhoKG8yYiZFau59uw1n5PsxtDgNdtlC4_cUqaBCS-0bxoWUTR48fUbacTQ1Nt7jehttAw9Xml5XedI921z_kTknNLfxNGMwketoui-LaP_ruyAhnHxIwfR9QLewyZotA12aABNLOPLZ26klqafNrnnYKE5MwsJJiveZNNPVvFP0rvY7-ngvMRbpKu1rwSy0vzAi7tMzQgAz9ck08sreb8xVWMXSzHl-UlNnqyKpzmJ5WGyCBspHSUd-Xr0RHjrZPyv997_7ZvrYY67q5ABmubPwaSNau4WNsDRKPj7DUmeEU1PDEAP-OlJfZechZwjisBeoS8qPBgeJ9dw-3ZH7V3PvPjO2u-r9HSDjLaxBKzwwO-EkGjeNgX75A_xyj9wphxWWxVPPdHlWXiHtoqnGbbMY6gNJhkWDivWZd9Bc-hD-rLgxPnijvROuriIuSWqxtrXqZN_xxYKwMcW4uIueJUPWFsjazDV-H1BjqqmgB-M8l6eDSUOPjw63m7SWn_mQtOtwNzBwJTdRY-OtKgysMTFwKeeT9MhHv_LD8L1LUyaO0BpAEkZwfVmWJeTpbUAqM9Ajj47CC09HNFB72Fc5EHym-f66P6g5VKPnaqfPobW2ceNuGP9ARX72D7fxRlyqQlBYi5tD8LGT0Oxg4asJbjkeb4oLD8_Lx_zTvxOeuNu1ZTP-s3ShM1xh5SnrxKI6c3TjJBO5icd0sch0eglU5M-flUQTAnG00tGjImLpyS4-EmPKDE5IiwD0njyXGPHXeCk1Prk-6ToVZi2v40HsvL406W5cOEeJfjJKPTHLH-6J3ZSDU4j-ftZQ7uHtK4lk_hKqT8KFzMTD8lv8U96z2DkodfbyeKZ61SFvr-oNo_RwMGypm_mIw718S7x8AxIujdeahJJL8U", name: "Katerina"},
    ]
  },
/*  _subscribe(observer: any) {
    this.rerenderEntireTree = observer
  },
  getState() {
    return this._state
  },*/
/*  rerenderEntireTree() {
    console.log("LaLaLa")
  },*/
}

const profileProps = {
  profileInfoData: store._state.profilePage.profileInfoData,
  arrayMyPosts: store._state.profilePage.arrayMyPosts,
  newMessage: store._state.profilePage.newMessage,
}

const dialogsProps = {
  dialogsData: store._state.dialogsPage.dialogsData,
  messageData: store._state.dialogsPage.messageData,
  newMessageBody: store._state.dialogsPage.newMessageBody,
}
const friendsProps = {
  friend: store._state.friend,
}

const appStateProps = { //главный state
  networkData: store._state.profilePage.networkData,
  profileProps: profileProps,
  dialogsProps: dialogsProps,
  friendsProps: friendsProps,
}

export default appStateProps


