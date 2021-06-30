import {addPostAC, deletePostAC, profileReduser, ProfileType} from "./ProfileReduser";
import {v1} from "uuid";

  let avatar = "https://www.anypics.ru/download.php?file=201210/1440x900/anypics.ru-5910.jpg"
  let one = v1(), two = v1(), three = v1()
  let state = {
    newMessage: 'BlaBlaBla',
    networkData: {
      logo: '',
      background: '',
      navBar: ''
    },
    profileInfoData: {
      content: "Ava + Discription",
      backgroundImg: "",
    },
    arrayMyPosts: [
      {id: one, avatar: avatar, message: "Hi", amount: 5},
      {id: two, avatar: avatar, message: "How are you?", amount: 3},
      {id: three, avatar: avatar, message: "Fine", amount: 4},
    ],
    profile: {} as ProfileType,
    isFetching: true,
    status: "",
  }

test('length of posts should be incremented', () => {
  let action = addPostAC('Heeey')

  let newState = profileReduser(state, action);

  expect(newState.arrayMyPosts.length).toBe(4)
  expect(newState.arrayMyPosts[0].message).toBe('Heeey')
  expect(newState.arrayMyPosts[0].avatar).toBe('')
  expect(newState.arrayMyPosts[0].amount).toBe(0)
})

it('length of posts should be decremented', () => {

  let action = deletePostAC(one)

  let newState = profileReduser(state, action);

  expect(newState.arrayMyPosts.length).toBe(2)
  expect(newState.arrayMyPosts[0].message).toBe('How are you?')
  expect(newState.arrayMyPosts[0].avatar).toBe(avatar)
  expect(newState.arrayMyPosts[0].amount).toBe(3)
})

it('after deleting length of posts should be decrement if id is incorrect', () => {

  let action = deletePostAC('1')

  let newState = profileReduser(state, action);

  expect(newState.arrayMyPosts.length).toBe(3)
  expect(newState.arrayMyPosts[0].message).toBe('Hi')
  expect(newState.arrayMyPosts[0].avatar).toBe(avatar)
  expect(newState.arrayMyPosts[0].amount).toBe(5)
})
