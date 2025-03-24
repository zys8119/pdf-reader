<template>
    <div class='App abs-content flex flex-col'>
        <pdfReader ref="pdfReaderRef" :src="pdf" fixedOutline :swiperOptopns="swiperOptopns"></pdfReader>
    </div>
</template>
<script setup lang="ts">
import "pdf-reader/style.css"
import pdfReader, { GlobalWorkerOptions } from "pdf-reader"
import workerUrl from "pdf-reader/pdf.worker.mjs?url"
import pdf from "./test1.pdf?url"
import { onMounted, ref } from "vue"
GlobalWorkerOptions.workerSrc = workerUrl

const pdfReaderRef = ref<InstanceType<typeof pdfReader>>()
const swiperOptopns = ref<any>({
    speed: 300,
    allowTouchMove: true,
})
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