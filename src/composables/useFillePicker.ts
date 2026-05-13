import { ref } from "vue";
import { useDevice } from "./useDevice";

export const useFillePicker = () => {
    const isLoading = ref(false);
    const { isNativeAvailable } = useDevice();
    const onPickImage = async (): Promise<string | undefined> => {
        if (!isNativeAvailable) {
            console.warn('ImagePickerModule is not available.');
            return new Promise((resolve) => resolve(undefined));
        }
        isLoading.value = true;
        try {
            const uri = await NativeModules.ImagePickerModule.pickImage();
            console.log('✅ Select a picture. (Finished) URI:', uri);
            return new Promise((resolve) => resolve(uri));
        } catch (error) {
            console.error('❌ Image selection failed or was cancelled.:', error);
            return new Promise((resolve) => resolve(undefined));
        } finally {
            isLoading.value = false;
        }
    };

    const onPickMultiple = async (): Promise<string[] | undefined> => {
        if (!isNativeAvailable) {
            console.warn('ImagePickerModule is not available.');
            return new Promise((resolve) => resolve(undefined));
        }
        isLoading.value = true;
        try {
            const uris = await NativeModules.ImagePickerModule.pickMultipleImages();

            console.log('✅ Select all picture:', uris.length, 'images');
            console.log('All files:', uris);
            return new Promise((resolve) => resolve(uris));
        } catch (error) {
            console.error('❌ Image selection failed:', error);
            return new Promise((resolve) => resolve(undefined));
        } finally {
            isLoading.value = false;
        }
    };

    const onTakePhoto = async (): Promise<string | undefined> => {
        if (!isNativeAvailable) {
            console.warn('ImagePickerModule is not available.');
            return new Promise((resolve) => resolve(undefined));
        }
        try {
            const photoUriResponse = await NativeModules.ImagePickerModule.takePhoto();
            console.log(
                '📸 Photo taken successfully. The file is located at:',
                photoUriResponse,
            );
            return new Promise((resolve) => resolve(photoUriResponse));
        } catch (error) {
            console.error('❌ Cancellation or photo taking failed.:', error);
            return new Promise((resolve) => resolve(undefined));
        }
    };

    return {
        isLoading,
        onPickImage,
        onPickMultiple,
        onTakePhoto
    };
}