<template>
    <div class='App abs-content flex flex-col'>
        <div class="abs-r flex-1">
            <pdfReader ref="pdfReaderRef" :src="pdf" fixedOutline @change="change"></pdfReader>
        </div>
        <div>
            <button @click="test">asd</button>
        </div>
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

const change = () => {
    console.log(pdfReaderRef.value)
}
onMounted(() => {
    pdfReaderRef.value.isOpenDrauu = false
})
const test = () => {
    pdfReaderRef.value?.nextPage()
}
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