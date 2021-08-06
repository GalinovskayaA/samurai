import {PhotosUserProfileType, ProfileType} from "../redux/ProfileReducer";
import {instance, APIResponseType} from "./api";

export const profileAPI = {
  getProfile(id: string) {
    return instance.get<ProfileType>(`profile/` + id);
  },
  getStatus(id: string) {
    return instance.get<string>(`profile/status/` + id);
  },
  updateStatus(status: string) {
    return instance.put<APIResponseType>(`profile/status`, {status: status} );
  },
  savePhoto(photoFile: string) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put<APIResponseType<SavePhotoResponseType>>(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put<APIResponseType>(`profile`, profile);
  }
}

type SavePhotoResponseType = {
  photos: PhotosUserProfileType
}