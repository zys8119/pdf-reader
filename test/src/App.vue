<template>
    <div class='App abs-content flex flex-col'>
        <pdfReader ref="pdfReaderRef" :src="pdf" isOpenDrauu fixedOutline :swiperOptopns="swiperOptopns"></pdfReader>
    </div>
</template>
<script setup lang="ts">
import "pdf-reader/style.css"
import pdfReader, { GlobalWorkerOptions } from "pdf-reader"
import workerUrl from "pdf-reader/pdf.worker.mjs?url"
import pdf from "./test1.pdf?url"
import { onMounted, watch, ref } from "vue"
GlobalWorkerOptions.workerSrc = workerUrl

const pdfReaderRef = ref<InstanceType<typeof pdfReader>>()
const swiperOptopns = ref<any>({
    speed: 300,
    allowTouchMove: true,
})
watch(() => pdfReaderRef.value?.swiper, () => {
    if (pdfReaderRef.value) {
        pdfReaderRef.value.swiper.slideTo(2)
    }
}, { immediate: true })
</script>
<style scoped lang="less">
.App {
    &:deep {
        // .outline-panel {
        //     position: absolute;
        //     left: 0;
        //     top: 0;
        //     height: 100%;
        //     z-index: 2;
        //     background: #fff;
        // }
    }
}
</style>