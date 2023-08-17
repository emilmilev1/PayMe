import { makeAutoObservable, runInAction } from "mobx";
import { Photo, Profile } from "../models/profile";
import { store } from "./store";
import api from "../api/api";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploading = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        }

        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;

        try {
            const profile = await api.Profiles.get(username);

            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            });
        } catch (error: any) {
            console.log(error.message);
            runInAction(() => (this.loadingProfile = false));
        }
    };

    uploadPhoto = async (file: Blob) => {
        this.uploading = true;

        try {
            const response = await api.Profiles.uploadPhoto(file);

            const photo = response.data;

            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url;
                    }
                }
                this.uploading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => (this.uploading = false));
        }
    };

    setMainPhoto = async (photo: Photo) => {
        this.loading = true;

        try {
            await api.Profiles.setMainPhoto(photo.id);

            store.userStore.setImage(photo.url);

            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find((p) => p.isMain)!.isMain = false;
                    this.profile.photos.find((p) => p.id === photo.id)!.isMain =
                        true;
                    this.profile.image = photo.url;
                    this.loading = false;
                }
            });
        } catch (error) {
            runInAction(() => (this.loading = false));
            console.log(error);
        }
    };

    deletePhoto = async (photo: Photo) => {
        this.loading = true;

        try {
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(
                        (p) => p.id !== photo.id
                    );
                }
            });

            await api.Profiles.deletePhoto(photo.id);

            runInAction(() => {
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => (this.loading = false));
            console.log(error);
        }
    };

    updateProfile = async (profile: Partial<Profile>) => {
        this.loading = true;

        try {
            await api.Profiles.updateProfile(profile);

            runInAction(() => {
                if (
                    profile.username &&
                    profile.username !== store.userStore.user?.username
                ) {
                    store.userStore.setDisplayName(profile.username);
                }

                this.profile = { ...this.profile, ...(profile as Profile) };
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => (this.loading = false));
        }
    };
}
