import 'core-js';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from "pdfjs-dist"
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
        console.log(111)
        pdf.value = await getDocument(props.src).promise
        console.log(222)
        numPages.value = pdf.value.numPages
        outline.value = await pdf.value.getOutline()
        const swiperEl = document.querySelector('.swiper');
        const swiper = new Swiper(swiperEl as any, {
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
        swiper.slidePrev();
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
    const outlineClick = (item: any) => {
        item.show = !item.show
    }
    const renderOutlineList = (outline: any[]) => {
        return (<>
            {outline.map((item) => {
                return (<div class={'p-15px'}>
                    <div onClick={() => outlineClick(item)} class='flex-center-start'>
                        {item.items && item.items.length > 0 ? (<div class={'text-#f00'}><svg fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2642" width="200" height="200"><path d="M768 682.666667c-12.8 0-21.333333-4.266667-29.866667-12.8L512 443.733333l-226.133333 226.133334c-17.066667 17.066667-42.666667 17.066667-59.733334 0s-17.066667-42.666667 0-59.733334l256-256c17.066667-17.066667 42.666667-17.066667 59.733334 0l256 256c17.066667 17.066667 17.066667 42.666667 0 59.733334-8.533333 8.533333-17.066667 12.8-29.866667 12.8z"></path></svg></div>) : null}
                        <div class={'flex-1'}>{item.title}</div>
                    </div>
                    {item.show ? <div >
                        {item.items && item.items.length > 0 && renderOutlineList(item.items)}
                    </div> : null}
                </div>)
            })}
        </>)
    }
    const renderOutline = (outline: any[]) => {
        return (<>
            <div class="flex of-auto select-none cursor-pointer">
                <div class={'text-12px'}>
                    <div>缩略图</div>
                    <div>大纲</div>
                </div>
                <div class={'of-auto'}>
                    {renderOutlineList(outline)}
                </div>
            </div>
        </>)
    }
    return () => (<>
        <div class={'abs-content flex'}>
            {renderOutline(outline.value)}
            <div class={'flex-1 abs-r'}>
                <div ref={container} class='abs-content bg-#e8e8e8'>
                    <div class="swiper abs-content">
                        <div class="swiper-wrapper"></div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div >
            </div>
        </div>
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
