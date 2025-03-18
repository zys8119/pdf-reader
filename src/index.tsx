import { getDocument, GlobalWorkerOptions, PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist"
import Swiper from "swiper"
export default defineComponent(({
    src
}) => {
    const pdf = shallowRef<PDFDocumentProxy>() as Ref<PDFDocumentProxy>
    const numPages = ref(0)
    const currentPage = ref(0)
    // 大纲
    const outline = ref<any[]>([])
    const container = ref<HTMLDivElement>() as Ref<HTMLDivElement>

    const render = async (canvas: HTMLCanvasElement, pageIndex: number) => {
        const { width: boxw, height: boxh } = useElementSize(container)
        const { width: cw, height: ch } = useElementSize(canvas)
        const scale = computed(() => {
            const w = boxw.value / cw.value
            const h = boxh.value / ch.value
            return Math.min(w, h)
        })
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        const page = await pdf.value.getPage(pageIndex + 1)
        const viewport = page.getViewport({ scale: 1 })
        canvas.height = viewport.height
        canvas.width = viewport.width
        watch(scale, () => {
            canvas.style.transform = 'scale(' + scale.value + ')'
        }, { immediate: true })
        page.render({
            viewport,
            canvasContext: ctx
        })
        return {
            scale,
            canvas
        }
    }
    onMounted(async () => {
        pdf.value = await getDocument(src).promise
        numPages.value = pdf.value.numPages
        outline.value = await pdf.value.getOutline()
        new Swiper('.swiper')
    })
    const renderCanvas = (_: any, k: number) => {
        return <div class="swiper-slide flex-center" style={{
            display: 'flex !important',
        }}>
            <canvas ref={el => {
                render(el as any, k)
            }} />
        </div>
    }
    return () => (<>
        <div ref={container} class='abs-content bg-#e8e8e8'>
            <div class="swiper abs-content">
                <div class="swiper-wrapper">
                    {new Array(numPages.value).fill(0).map(renderCanvas)}
                </div>
            </div>
        </div >
    </>)
}, {
    props: {
        src: String
    },
    inheritAttrs: false
})
export { GlobalWorkerOptions } 
