<template>
    <div class='App abs-content'>
        <pdfReader :src="pdf" fixedOutline :swiper="false"></pdfReader>
    </div>
</template>
<script setup lang="ts">
import "pdf-reader/style.css"
import pdfReader, { GlobalWorkerOptions } from "pdf-reader"
import workerUrl from "pdf-reader/pdf.worker.mjs?url"
import pdf from "./test1.pdf?url"
GlobalWorkerOptions.workerSrc = workerUrl
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