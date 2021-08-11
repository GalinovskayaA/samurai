import {followSuccessAC, unfollowSuccessAC, usersReducer, UsersStatePropsType, UsersType} from "../redux/UsersReducer";

let state: UsersStatePropsType
beforeEach(() => {
    state = {
        users: [
            {id: '0',
                followed: false,
                location: {city: 'Minsk', country: 'Belarus'},
                status: 'status 0',
                avatar: '',
                name: 'User 0',
                photos: {big: '', small: ''}},
            {id: '1',
                followed: false,
                location: {city: 'Minsk', country: 'Belarus'},
                status: 'status 1',
                avatar: '',
                name: 'User 1',
                photos: {big: '', small: ''}},
            {id: '2',
                followed: true,
                location: {city: 'Minsk', country: 'Belarus'},
                status: 'status 2',
                avatar: '',
                name: 'User 2',
                photos: {big: '', small: ''}},
            {id: '3',
                followed: true,
                location: {city: 'Minsk', country: 'Belarus'},
                status: 'status 3',
                avatar: '',
                name: 'User 3',
                photos: {big: '', small: ''}}
        ] as Array<UsersType>,
        pageSize: 10,
        totalUsersCount: 20,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    };
})

test('follow success', () => {
const newState = usersReducer(state, followSuccessAC('1'))
    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test('unfollow success', () => {
    const newState = usersReducer(state, unfollowSuccessAC('3'))
    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
})