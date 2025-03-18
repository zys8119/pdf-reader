import { getDocument, GlobalWorkerOptions, PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist"
export default defineComponent(({
    src
}) => {
    const pdf = shallowRef<PDFDocumentProxy>()
    const numPages = ref(0)
    const currentPage = ref(0)
    const pages = computed<Promise<PDFPageProxy>[]>(() => {
        const pages = [] as any[]
        if (!pdf.value) { return pages }
        for (let i = 1; i <= numPages.value; i++) {
            pages.push(pdf.value.getPage(i))
        }
        return pages
    })
    // 大纲
    const outline = ref<any[]>([])
    const pageInfo = computed<Promise<PDFPageProxy>>(() => {
        return pages.value[currentPage.value]
    })
    const container = ref<HTMLDivElement>() as Ref<HTMLDivElement>
    const canvas = ref<HTMLCanvasElement>() as Ref<HTMLCanvasElement>
    const { width: boxw, height: boxh } = useElementSize(container)
    const { width: cw, height: ch } = useElementSize(canvas)
    const scale = computed(() => {
        const w = boxw.value / cw.value
        const h = boxh.value / ch.value
        return Math.min(w, h)
    })
    const render = async () => {
        const ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D
        const page = await pageInfo.value
        const viewport = page.getViewport({ scale: 1 })
        canvas.value.height = viewport.height
        canvas.value.width = viewport.width
        page.render({
            viewport,
            canvasContext: ctx
        })
    }
    onMounted(async () => {
        pdf.value = await getDocument(src).promise
        numPages.value = pdf.value.numPages
        outline.value = await pdf.value.getOutline()
        console.log(outline.value)
        await render()
    })
    return () => (<>
        <div style={{
            '--scale': scale.value
        }} ref={container} class='abs-content flex-center bg-#e8e8e8'>
            <canvas ref={canvas} class="transform-scale-$scale" />
        </div >
    </>)
}, {
    props: {
        src: String
    },
    inheritAttrs: false
})
export { GlobalWorkerOptions } 
