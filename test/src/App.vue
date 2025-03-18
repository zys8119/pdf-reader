<template>
    <div class='App abs-content'>
        <pdfReader :src="pdf"></pdfReader>
    </div>
</template>
<script setup lang="ts">
import "pdf-reader/style.css"
import pdfReader from "pdf-reader"
import pdf from "./test1.pdf?url"
</script>
<style scoped lang="less">
.App {}
</style>