import { getDocument, GlobalWorkerOptions } from "pdfjs-dist"
// import workerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';
GlobalWorkerOptions.workerSrc = './pdf.worker.mjs';
export default defineComponent<{
    src: Parameters<typeof getDocument>[0]
}>(({
    src
}) => {
    onMounted(async () => {
        const pdf = await getDocument(src).promise
        console.log(pdf)
    })
    return () => (<>
        <div class={'bg-#f00'} >
        </div>
    </>)
}, {
    inheritAttrs: false
})
