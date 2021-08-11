import {followingInProgressAC, followSuccessAC, followTC, unfollowSuccessAC, unfollowTC} from "../redux/UsersReducer";
import {usersAPI} from "../api/users-api";
import {APIDataResponseType} from "../api/api";

jest.mock("../api/users-api")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()
})

const result: APIDataResponseType = {
    data: {
        resultCode: 0,
        messages: [],
        data: {}
    }
}

usersAPIMock.follow.mockReturnValue(result)
usersAPIMock.unfollow.mockReturnValue(result)

test('thunk follow success', async() => {
    const thunk = followTC('1')

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, followingInProgressAC(true, '3'))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, followSuccessAC('3'))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, followingInProgressAC(false, '3'))
})
test('thunk unfollow success', async() => {
    const thunk = unfollowTC('1')
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, followingInProgressAC(true, '3'))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollowSuccessAC('3'))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, followingInProgressAC(false, '3'))
})