import {v1} from "uuid";

export type FriendsType = {
    id: string,
    avatar: string,
    name: string
}

export type FriendsPropsType = {
    friends: Array<FriendsType>
}

const initialState: FriendsPropsType = {
    friends: [
        {
            id: v1(),
            avatar: "https://img1.goodfon.ru/original/1920x1172/4/bc/kunfu-panda-2-multfilm.jpg",
            name: "Viktor"
        },
        {
            id: v1(),
            avatar: "https://shutniki.club/wp-content/uploads/2020/01/smeshnye_avatarki_34_17105705.jpg",
            name: "Dima"
        },
        {
            id: v1(),
            avatar: "https://yandex-images.naydex.net/NQvb96385/bc04c3hdhXu/Kn883ud1u_Wg6V0qj0LyZMf8dwOfqlxQUQSKy_15QB2k4uyiTudpD3tUVNbbHlCyGLUcwTFPtfhoKG8yYiZFau59uw1n5PsxtDgNdtlC4_cUqaBCS-0bxoWUTR48fUbacTQ1Nt7jehttAw9Xml5XedI921z_kTknNLfxNGMwketoui-LaP_ruyAhnHxIwfR9QLewyZotA12aABNLOPLZ26klqafNrnnYKE5MwsJJiveZNNPVvFP0rvY7-ngvMRbpKu1rwSy0vzAi7tMzQgAz9ck08sreb8xVWMXSzHl-UlNnqyKpzmJ5WGyCBspHSUd-Xr0RHjrZPyv997_7ZvrYY67q5ABmubPwaSNau4WNsDRKPj7DUmeEU1PDEAP-OlJfZechZwjisBeoS8qPBgeJ9dw-3ZH7V3PvPjO2u-r9HSDjLaxBKzwwO-EkGjeNgX75A_xyj9wphxWWxVPPdHlWXiHtoqnGbbMY6gNJhkWDivWZd9Bc-hD-rLgxPnijvROuriIuSWqxtrXqZN_xxYKwMcW4uIueJUPWFsjazDV-H1BjqqmgB-M8l6eDSUOPjw63m7SWn_mQtOtwNzBwJTdRY-OtKgysMTFwKeeT9MhHv_LD8L1LUyaO0BpAEkZwfVmWJeTpbUAqM9Ajj47CC09HNFB72Fc5EHym-f66P6g5VKPnaqfPobW2ceNuGP9ARX72D7fxRlyqQlBYi5tD8LGT0Oxg4asJbjkeb4oLD8_Lx_zTvxOeuNu1ZTP-s3ShM1xh5SnrxKI6c3TjJBO5icd0sch0eglU5M-flUQTAnG00tGjImLpyS4-EmPKDE5IiwD0njyXGPHXeCk1Prk-6ToVZi2v40HsvL406W5cOEeJfjJKPTHLH-6J3ZSDU4j-ftZQ7uHtK4lk_hKqT8KFzMTD8lv8U96z2DkodfbyeKZ61SFvr-oNo_RwMGypm_mIw718S7x8AxIujdeahJJL8U",
            name: "Katerina"
        },
    ] as Array<FriendsType>
}

export const friendReducer = (state = initialState, action: any): FriendsPropsType => {
    return state;
}

