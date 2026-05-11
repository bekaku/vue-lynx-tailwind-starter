<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseCardContent from '@/components/base/BaseCardContent.vue';
import BaseCardHeader from '@/components/base/BaseCardHeader.vue';
import BaseCardTitle from '@/components/base/BaseCardTitle.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseImage from '@/components/base/BaseImage.vue';
import BaseToolBar from '@/components/base/BaseToolBar.vue';
import { useDevice } from '@/composables/useDevice';
import { Camera, Image } from 'lucide-static';
import { ref } from 'vue';
const { isNativeAvailable } = useDevice();
const selectedImageUri = ref<string | null>(null);
const photoUri = ref<string | null>(null);
const selectedImages = ref<string[]>([]);
const isLoading = ref(false);

const handlePickImage = async () => {
  if (!isNativeAvailable) {
    console.warn('ImagePickerModule is not available.');
    return;
  }
  isLoading.value = true;
  try {
    const uri = await NativeModules.ImagePickerModule.pickImage();
    console.log('✅ Select a picture. (Finished) URI:', uri);
    selectedImageUri.value = uri;
    //upload to server
    // uploadImage(uri);
  } catch (error) {
    console.error('❌ Image selection failed or was cancelled.:', error);
  } finally {
    isLoading.value = false;
  }
};

const handlePickMultiple = async () => {
  if (!isNativeAvailable) {
    console.warn('ImagePickerModule is not available.');
    return;
  }
  isLoading.value = true;
  try {
    const uris = await NativeModules.ImagePickerModule.pickMultipleImages();

    console.log('✅ Select all picture:', uris.length, 'images');
    console.log('All files:', uris);

    selectedImages.value = uris;
  } catch (error) {
    console.error('❌ Image selection failed:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleTakePhoto = async () => {
  try {
    const photoUriResponse = await NativeModules.ImagePickerModule.takePhoto();
    console.log(
      '📸 Photo taken successfully. The file is located at:',
      photoUriResponse,
    );
    photoUri.value = photoUriResponse;
  } catch (error) {
    console.error('❌ Cancellation or photo taking failed.:', error);
  }
};
/*
const uploadImage = async (fileUri: string) => {
  try {
    const formData = new FormData();
    // ใส่ URI ตรงๆ เข้าไปได้เลยครับ
    formData.append('file', {
      uri: fileUri,
      name: 'upload.jpg', 
      type: 'image/jpeg' 
    } as any);

    const response = await fetch('https://api.yourdomain.com/upload', {
      method: 'POST',
      body: formData,
    });
    
    console.log("อัพโหลดสำเร็จ!");
  } catch (error) {
    console.error("อัพโหลดพัง:", error);
  }
};

const uploadImage = async (fileUri: string) => {
  try {
    const formData = new FormData();

    // 🌟 กฎพิเศษของ Mobile: ห้ามโยน String เปล่าๆ 
    // ต้องสร้าง Object หน้าตาแบบนี้ยัดลงไป เพื่อให้ Native Bridge รู้ว่า "อ้อ นี่คือไฟล์นะ ไปดึงมาซะ!"
    const fileObj = {
      uri: fileUri,           // Path file:// ที่เราเพิ่งทำกันมา
      name: 'upload.jpg',     // ตั้งชื่อไฟล์ปลายทาง
      type: 'image/jpeg',     // ระบุ MIME Type
    };

    // ต้องใส่ as any เพราะ TypeScript ฝั่ง Web จะไม่รู้จัก Object แบบนี้ใน FormData
    formData.append('file', fileObj as any); 

    // 🌟 ยิง Axios โลด!
    const response = await axios.post('https://api.yourserver.com/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 🌟 สำคัญมาก อย่าลืม!
      },
    });

    console.log('อัพโหลดผ่าน Axios สำเร็จ!', response.data);

  } catch (error) {
    console.error('อัพโหลดพัง:', error);
  }
};
*/
</script>

<template>
  <view class="w-full h-full flex flex-col bg-background">
    <BaseToolBar title="Image picker" />

    <scroll-view :class="['flex-1 w-full']" scroll-orientation="vertical">
      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>Single Image</BaseCardTitle>
        </BaseCardHeader>
        <BaseCardContent>
          <view class="flex justify-center">
            <view
              class="w-64 h-64 bg-background rounded-2xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden"
            >
              <BaseImage
                v-if="selectedImageUri"
                :src="selectedImageUri"
                class="w-full h-full"
                fit="cover"
              />
              <text v-else class="text-muted-foreground">
                No image has been selected yet.
              </text>
            </view>
          </view>
        </BaseCardContent>

        <BaseButton
          @tap="handlePickImage"
          class="m-3"
          :label="isLoading ? 'Opening...' : 'Select a photo from the album.'"
        >
          <template #start>
            <BaseIcon :name="Image" class="mr-1" />
          </template>
        </BaseButton>
      </BaseCard>

      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>Multiple Image</BaseCardTitle>
        </BaseCardHeader>
        <BaseCardContent>
          <view class="flex flex-row flex-wrap gap-2 justify-center">
            <view
              v-for="(uri, index) in selectedImages"
              :key="index"
              class="w-24 h-24 bg-muted rounded-md overflow-hidden"
            >
              <BaseImage :src="uri" class="w-full h-full" fit="cover" />
            </view>
          </view>
        </BaseCardContent>
        <BaseButton
          @tap="handlePickMultiple"
          class="m-3"
          :label="
            isLoading ? 'Opening...' : 'Select multiple photo from the album.'
          "
        >
          <template #start>
            <BaseIcon :name="Image" class="mr-1" />
          </template>
        </BaseButton>
      </BaseCard>

      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>Take photo</BaseCardTitle>
        </BaseCardHeader>
        <BaseCardContent>
          <view class="flex justify-center">
            <view
              class="w-64 h-64 bg-background rounded-2xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden"
            >
              <BaseImage
                v-if="photoUri"
                :src="photoUri"
                class="w-full h-full"
                fit="cover"
              />
              <text v-else class="text-muted-foreground">
                No image has been take yet.
              </text>
            </view>
          </view>
        </BaseCardContent>

        <BaseButton
          @tap="handleTakePhoto"
          class="m-3"
          :label="isLoading ? 'Opening...' : 'Take a photo from camera.'"
        >
          <template #start>
            <BaseIcon :name="Camera" class="mr-1" />
          </template>
        </BaseButton>
      </BaseCard>
    </scroll-view>
  </view>
</template>
