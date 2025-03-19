import { getDocument, GlobalWorkerOptions, PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist"
import Swiper from "swiper"
import { register } from 'swiper/element/bundle';
import { createApp } from 'vue';
export default defineComponent<{
    src: string,
    vertical?: boolean
}>((props) => {
    register()
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
        const viewport = page.getViewport({ scale: 5 })
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
        pdf.value = await getDocument(props.src).promise
        numPages.value = pdf.value.numPages
        outline.value = await pdf.value.getOutline()
        const swiperEl = document.querySelector('.swiper');
        new Swiper(swiperEl as any, {
            spaceBetween: 30,
            zoom: {
                maxRatio: 5,
            },
            direction: props.vertical ? "vertical" : "horizontal",
            virtual: {
                enabled: true,
                slides: new Array(numPages.value).fill(0),
                renderSlide(s, k) {
                    const div = document.createElement('div')
                    div.className = 'swiper-slide'
                    div.innerHTML = 'asdas'
                    createApp(() => h(renderCanvas(s, k))).mount(div)
                    return div
                },
            },
            pagination: {
                el: '.swiper-pagination',
                type: "fraction",
                clickable: true,
            },
        })
    })
    const renderCanvas = (_: any, k: number) => {
        return <div class="swiper-slide flex-center">
            <div class="swiper-zoom-container  flex-center">
                <canvas ref={el => {
                    render(el as any, k)
                }} />
            </div>
        </div>
    }
    return () => (<>
        <div ref={container} class='abs-content bg-#e8e8e8'>
            <div class="swiper abs-content">
                <div class="swiper-wrapper"></div>
                <div class="swiper-pagination"></div>
            </div>
        </div >
    </>)
}, {
    props: {
        src: String,
        vertical: {
            type: Boolean,
            default: false
        }
    },
    inheritAttrs: false
})
export { GlobalWorkerOptions } 
