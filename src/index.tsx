import 'core-js';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from "pdfjs-dist"
import Swiper from "swiper"
import { register } from 'swiper/element/bundle';
import { createApp } from 'vue';
import { NEllipsis, NDropdown } from 'naive-ui';
import { useDrauu } from '@vueuse/integrations/useDrauu'
import { merge, omit, groupBy } from 'lodash'
import { Drauu, DrawModel } from 'drauu'
const onEnd = DrawModel.prototype.onEnd
DrawModel.prototype.onEnd = (function (this: any) {
    if (typeof (this.drauu as any).MyRectModelDrawRectEnd === 'function') {
        const path = this.el
        this.el = null
        if (!path)
            return false;
        (this.drauu as any).MyRectModelDrawRectEnd(path)
        return true
    } else {
        return onEnd.call(this)
    }
} as ((this: DrawModel) => boolean))
class MyRectModel extends DrawModel {
    exec: any
    declare el: any
    constructor(drauu: Drauu | any, public callback: string | ((path: SVGPathElement) => void)) {

        drauu.MyRectModelDrawRectEnd = (path: SVGPathElement) => {
            this.drawRectEnd(path)
        }
        drauu.exec = function (type: any, ev: any) {
            if (typeof type === 'function') return type.call(this, ev)
            this[type](ev)
        }
        super(drauu)
        this.exec = (point: PointerEvent, type: string | (() => void)) => drauu.exec(type, point)

    }
    eventDown(point: PointerEvent) {
        this.exec(point, 'eventStart')
    }
    eventMove(point: PointerEvent) {
        this.exec(point, 'eventMove')
    }
    eventUp(point: PointerEvent) {
        this.exec(point, 'eventEnd')
    }
    drawRectEnd(path: SVGPathElement) {
        if (typeof this.callback === 'string') {
            path.setAttribute('d', this.callback);
        } else {
            this.callback?.(path)
        }

        (this.drauu as any).MyRectModelDrawRectEnd = null
    }
    drawRect(point: PointerEvent, endEvent: PointerEvent) {
        this.exec(point, function (this: any, point: PointerEvent) {
            this.eventStart(point)
            this.eventMove(endEvent)
            this.eventEnd(endEvent)
        })
    }
}
const svgMap: any = {
    arrow: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2642" width="200" height="200"><path d="M768 682.666667c-12.8 0-21.333333-4.266667-29.866667-12.8L512 443.733333l-226.133333 226.133334c-17.066667 17.066667-42.666667 17.066667-59.733334 0s-17.066667-42.666667 0-59.733334l256-256c17.066667-17.066667 42.666667-17.066667 59.733334 0l256 256c17.066667 17.066667 17.066667 42.666667 0 59.733334-8.533333 8.533333-17.066667 12.8-29.866667 12.8z"></path></svg>,
    outline: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7722" width="200" height="200"><path d="M996.562475 131.235956V848.476632a322.978348 322.978348 0 0 1-1.356084 57.134648 151.651166 151.651166 0 0 1-27.659003 64.401212 138.857918 138.857918 0 0 1-80.3416 50.09836 236.700681 236.700681 0 0 1-52.401145 2.712169H189.999339a246.832934 246.832934 0 0 1-48.358479-1.893401 137.757698 137.757698 0 0 1-81.416232-46.874462 151.369715 151.369715 0 0 1-30.08972-63.60803 329.067934 329.067934 0 0 1-2.149266-63.32658v-675.483513a293.553877 293.553877 0 0 1 3.479763-65.194394A137.348314 137.348314 0 0 1 118.254802 8.625464 221.655821 221.655821 0 0 1 194.835187 0.540131h516.054052c19.343392 0 141.03277 0.179105 160.376162 0.255865a154.695959 154.695959 0 0 1 53.475778 16.170666 143.437901 143.437901 0 0 1 63.966242 74.917262 154.823892 154.823892 0 0 1 6.447797 25.867948c0.51173 4.503223 0.9467 8.98086 1.407257 13.484084z m-76.580384 4.298532l-0.537317-5.654616-3.50535-13.484084a62.891609 62.891609 0 0 0-25.586497-30.447931 111.736231 111.736231 0 0 0-58.593077-8.622649H204.583642a227.412783 227.412783 0 0 0-54.550411 1.8934 61.407592 61.407592 0 0 0-42.703863 40.938395 170.841039 170.841039 0 0 0-2.686582 44.725196v686.255429a222.065205 222.065205 0 0 0 1.330498 46.900049 71.642191 71.642191 0 0 0 15.351898 28.835981c15.761282 19.548083 41.833922 19.113113 77.117701 19.113113h633.163448a183.352836 183.352836 0 0 0 42.447998-1.867814 62.149601 62.149601 0 0 0 33.59507-22.362598c14.09816-19.241046 12.358278-40.145213 12.358278-73.049448V135.534488zM828.408019 507.152766a35.821095 35.821095 0 0 1-28.477771 39.889349 141.083943 141.083943 0 0 1-28.145146 0.537316h-362.816524a36.15372 36.15372 0 0 1-5.910481-70.618731 121.97083 121.97083 0 0 1 29.833855-1.074633h341.323867a95.974949 95.974949 0 0 1 33.59507 2.968034 36.614277 36.614277 0 0 1 18.524624 19.676016z m-4.145013 231.992766a35.514057 35.514057 0 0 1-29.552403 37.995948l-48.358479 0.281451H458.32493c-42.192133 0-74.78933 5.756962-81.134781-31.522564a33.467138 33.467138 0 0 1 4.01708-20.750649c13.202632-25.816775 45.006648-19.420151 82.235001-19.420151H734.991719a197.476582 197.476582 0 0 1 71.207221 4.60557 37.10042 37.10042 0 0 1 16.375358 20.187746z m10.464878-461.836266a36.691036 36.691036 0 0 1-17.475578 35.56523 162.423081 162.423081 0 0 1-67.164554 4.835848h-296.803362c-40.759289 0-69.979069 4.01708-76.043068-31.778429a33.467138 33.467138 0 0 1 4.01708-20.750648c12.255932-23.769855 38.021534-19.420151 72.81917-19.420151h309.59661a154.823892 154.823892 0 0 1 50.789196 3.249485 36.179306 36.179306 0 0 1 18.268759 19.676016zM230.937734 230.818601a51.172993 51.172993 0 1 1-51.172994 51.172994 51.172993 51.172993 0 0 1 51.172994-51.172994z m0 230.278471a51.172993 51.172993 0 1 1-51.172994 51.172993 51.172993 51.172993 0 0 1 51.172994-51.172993z m0 230.278471a51.172993 51.172993 0 1 1-51.172994 51.172993 51.172993 51.172993 0 0 1 51.172994-51.172993z" p-id="7723"></path></svg>,
    image: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8856" width="200" height="200"><path d="M158.2 158.5h707.6c20.3 0 36.6 16.3 36.6 36.6v288.7c-36.6-28.5-105.7-73.2-158.6-73.2-77.3 0-146.4 178.9-231.8 178.9-65.1-4.1-154.5-77.3-256.2-65.1-40.7 8.1-97.6 73.2-134.2 122V195.1c0-20.4 16.3-36.6 36.6-36.6zM329 451.3c-32.5 0-61-12.2-81.3-32.5s-32.5-52.9-32.5-81.3c0-28.5 12.2-61 32.5-81.3 20.3-20.3 48.8-32.5 81.3-32.5 28.5 0 56.9 12.2 81.3 32.5 20.3 20.3 32.5 52.9 32.5 81.3 0 28.5-12.2 61-32.5 81.3-24.4 20.3-52.8 32.5-81.3 32.5z m557.1-345.7H137.9c-40.7 0-73.2 32.5-73.2 73.2v666.9c0 40.7 32.5 73.2 73.2 73.2h748.3c40.7 0 73.2-32.5 73.2-73.2V178.8c-0.1-40.7-32.6-73.2-73.3-73.2z m0 0" p-id="8857"></path></svg>,
    menu: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3949" width="200" height="200"><path d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z" p-id="3950"></path></svg>,
    handwriting: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4806" width="200" height="200"><path d="M635.973818 120.157091L230.469818 526.801455c-44.706909 44.869818-175.197091 311.621818-175.197091 311.621818s-5.748364 24.250182 9.076364 38.050909c15.755636 14.638545 36.770909 6.516364 36.770909 6.516363s274.106182-138.821818 310.132364-174.94109l26.996363-27.066182 378.484364-379.578182-180.759273-181.248zM910.429091 71.517091l-45.195636-45.312C846.545455 7.447273 820.503273-0.465455 793.6 1.931636c-26.949818 2.397091-54.784 15.104-77.172364 37.538909l-26.973091 27.04291 180.759273 181.271272 26.996364-27.066182c44.753455-44.869818 50.664727-111.709091 13.195636-149.178181M961.629091 1022.603636c-8.285091 0-16.593455-2.699636-23.528727-8.285091-1.047273-0.837818-111.732364-88.157091-247.435637-94.72-89.227636-4.282182-165.329455 20.270545-245.922909 46.289455-51.176727 16.523636-104.098909 33.582545-160.046545 42.309818-132.002909 20.573091-229.236364-4.235636-233.309091-5.306182a37.701818 37.701818 0 0 1 18.897454-72.983272c0.861091 0.232727 87.156364 21.806545 202.868364 3.770181 50.082909-7.796364 97.931636-23.226182 148.573091-39.563636 83.432727-26.926545 169.704727-54.760727 272.523636-49.803636 160.721455 7.749818 285.696 106.984727 290.909091 111.197091 16.197818 13.032727 18.804364 36.770909 5.794909 53.015272a37.469091 37.469091 0 0 1-29.323636 14.103273" p-id="4807"></path></svg>,
    eye: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8440" width="200" height="200"><path d="M512 73.152c231.68 0 429.76 180.8 512 436.928-82.24 258.624-280.32 440.768-512 440.768-231.744 0-429.824-182.144-512-440.512 82.176-256.384 280.32-437.184 512-437.184z m0 109.696c-168.192 0-320.64 127.424-395.904 327.616C191.36 712.512 343.936 841.152 512 841.152c168.128 0 320.768-128.768 395.904-330.88C832.576 310.272 680 182.912 512 182.912z m0 108.544c24.704 0 48.384 4.992 70.272 13.952h-0.768c-51.392 0-93.056 46.272-93.056 103.232s41.6 103.168 93.056 103.168c51.328 0 92.992-46.208 92.992-103.168a112 112 0 0 0-4.672-32.384c26.88 37.76 42.88 85.376 42.88 137.28 0 122.56-89.856 221.952-200.768 221.952-110.784 0-200.704-99.392-200.704-221.952 0-122.688 89.92-222.08 200.704-222.08z" p-id="8441"></path></svg>,
    line: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10410" width="200" height="200"><path d="M191.488 864.768c-8.192 0-16.384-3.072-22.528-9.216-12.288-12.288-12.288-32.768 0-45.056L809.472 168.96c12.288-12.288 32.768-12.288 45.056 0s12.288 32.768 0 45.056L214.016 855.04c-6.144 6.144-14.336 9.728-22.528 9.728z" p-id="10411"></path></svg>,
    rectangle: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11394" width="200" height="200"><path d="M841.34 959.36H182.66c-65.06 0-117.99-52.94-117.99-118.02V182.69c0-65.08 52.94-118.04 117.99-118.04h658.68c65.06 0 117.99 52.96 117.99 118.04v658.65c0 65.08-52.93 118.02-117.99 118.02zM182.66 142.17c-22.31 0-40.51 18.18-40.51 40.51v658.65c0 22.34 18.2 40.49 40.51 40.49h658.68c22.31 0 40.51-18.15 40.51-40.49V182.69c0-22.34-18.2-40.51-40.51-40.51H182.66z" p-id="11395"></path></svg>,
    ellipse: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12417" width="200" height="200"><path d="M512 928C282.624 928 96 741.376 96 512S282.624 96 512 96s416 186.624 416 416-186.624 416-416 416z m0-768C317.92 160 160 317.92 160 512s157.92 352 352 352 352-157.92 352-352S706.08 160 512 160z" p-id="12418"></path></svg>,
    eraseLine: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13436" width="200" height="200"><path d="M567.024534 149.331607m60.339779 60.339778l199.422968 199.422969q60.339779 60.339779 0 120.679557l-184.941421 184.941422q-60.339779 60.339779-120.679558 0l-199.422968-199.422969q-60.339779-60.339779 0-120.679557l184.941421-184.941422q60.339779-60.339779 120.679558 0Z" fill="#666666" p-id="13437"></path><path d="M557.653333 256l211.2 213.333333-302.08 298.666667H346.88l-151.466667-151.466667L557.653333 256m0-85.333333a85.333333 85.333333 0 0 0-60.586666 24.746666L135.253333 554.666667a85.333333 85.333333 0 0 0 0 120.746666L311.466667 853.333333h190.293333l327.253333-327.253333a85.333333 85.333333 0 0 0 0-120.746667l-211.2-211.2A85.333333 85.333333 0 0 0 557.653333 170.666667z" fill="#666666" p-id="13438"></path><path d="M332.8 768m42.666667 0l469.333333 0q42.666667 0 42.666667 42.666667l0 0q0 42.666667-42.666667 42.666666l-469.333333 0q-42.666667 0-42.666667-42.666666l0 0q0-42.666667 42.666667-42.666667Z" p-id="13439"></path></svg>,
    draw: <svg viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14504" width="200" height="200"><path d="M871.876278 32.947837a67.103539 67.103539 0 0 0-106.224902-9.394495l-617.352556 617.352556 239.291219 236.271559 616.815728-616.882831a60.393185 60.393185 0 0 0-1.946003-96.830406z m-767.597379 652.917432l-51.871035 143.869987 146.755439 143.802883 140.917431-48.91848zM24.224377 893.483617L0.469725 1024l133.468938-17.849541z" p-id="14505"></path></svg>,
    retreat: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2125" width="200" height="200"><path d="M476.16 377.173333V227.555556A11.377778 11.377778 0 0 0 455.111111 216.746667l-312.888889 284.444444a11.377778 11.377778 0 0 0 0 17.066667l312.888889 284.444444a11.377778 11.377778 0 0 0 19.342222-7.964444v-137.102222a498.346667 498.346667 0 0 1 373.76 107.52 11.377778 11.377778 0 0 0 18.204445-11.377778c-19.911111-95.573333-106.951111-376.604444-390.257778-376.604445z" p-id="2126"></path></svg>,
    forward: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1797" width="200" height="200"><path d="M532.48 377.173333V227.555556a11.377778 11.377778 0 0 1 19.342222-7.964445l312.888889 284.444445a11.377778 11.377778 0 0 1 0 17.066666l-312.888889 284.444445a11.377778 11.377778 0 0 1-19.342222-7.964445v-139.946666a498.346667 498.346667 0 0 0-373.76 107.52 11.377778 11.377778 0 0 1-18.204444-11.377778c21.617778-95.573333 108.657778-376.604444 391.964444-376.604445z" p-id="1798"></path></svg>,
    clear: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17745" width="200" height="200"><path d="M433.664 250.88L773.12 590.336 599.466667 837.162667a42.666667 42.666667 0 0 1-65.066667 5.632l-61.333333-61.333334v-130.88h-130.858667L181.205333 489.6a42.666667 42.666667 0 0 1 5.632-65.066667l246.826667-173.632z m38.378667-26.986667l66.133333-46.528a42.666667 42.666667 0 0 1 54.72 4.714667l89.130667 89.152 93.781333-93.781333a21.333333 21.333333 0 0 1 30.165333 0l35.2 35.2a21.333333 21.333333 0 0 1 0 30.186666l-93.76 93.76 94.506667 94.506667a42.666667 42.666667 0 0 1 4.714667 54.72l-46.506667 66.133333-328.106667-328.064z" p-id="17746"></path></svg>,
    text: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2736" width="200" height="200"><path d="M127.744 99.136l-25.856 206.976h25.856c0-72.448 56.896-129.344 129.344-129.344h181.12v659.648c0 36.224-28.48 64.704-64.704 64.704h-64.64v25.92h413.824v-25.92h-64.64a64 64 0 0 1-64.704-64.704V176.704h181.12c72.384 0 129.344 56.96 129.344 129.344h25.792l-25.792-206.976H127.744v0.064z" p-id="2737"></path></svg>,
}
const svgIcon = (name = 'arrow', fontSize = '14px') => {
    return h(defineComponent(() => {
        return () => <i style={{
            '--fontSize': fontSize,
            fill: "currentColor"
        }} class={'text-$fontSize w-1em h-1em flex-center'}>
            {svgMap[name]}
        </i>
    }))
}
type TextItem = {
    item: any,
    text: string,
    x: number,
    y: number,
    // 所有文字的总宽度
    width: number,
    // 所有文字的总高度
    height: number,
    // 单个宽度
    textWidth: number,
    // 单个高度
    textHeight: number,
}

export default defineComponent<{
    // pdf文件路径
    src: string,
    // 是否垂直模式
    vertical?: boolean
    // 是否固定大纲
    fixedOutline?: boolean
    // 是否开启swiper模式
    swiper?: typeof Swiper
    swiperOptopns?: Parameters<typeof Swiper.extendDefaults>
    // 大纲
    outline?: any[]
    // 总页数
    numPages?: number
    // 当前页码
    currentPage?: number
    // 批注
    annotations?: Record<string | number, string | undefined>
    currentDrauu?: ReturnType<typeof useDrauu>
    currentDrauuOptopns?: {
        mode: 'draw' | 'stylus' | 'line' | 'rectangle' | 'ellipse' | 'eraseLine'
        color: string
        size: number
    }
    container?: HTMLDivElement
    showOutline?: boolean
    isShowThumbnailList?: boolean
    isOpenDrauu: boolean
    pdf?: PDFDocumentProxy
    thumbnailLists?: any[]
    getThumbnailLists?(): any
    prevPage?(): void
    nextPage?(): void
    showTools?: boolean
}, {
    change: () => void,
    'update:isOpenDrauu': (isOpenDrauu: boolean) => void
}, string, {

    }>((props, { expose, emit, slots }) => {
        register()
        const pdf = shallowRef<PDFDocumentProxy>() as Ref<PDFDocumentProxy>
        const numPages = ref(0)
        const currentPage = ref(0)
        // 批注
        const annotations = ref<Record<any, any>>({})
        // 大纲
        const outline = ref<any[]>([])
        const container = ref<HTMLDivElement>() as Ref<HTMLDivElement>
        const textItems = ref<Array<TextItem>>([])
        const textItemsIdMap = ref<Record<any, {
            x: number
            y: number
            text: string
            width: number
            height: number
            id: number,
        }>>({})
        const showOutline = ref(false)
        const outlineTabs = shallowRef([
            { title: '大纲', icon: 'outline', render: () => renderOutlineList(outline.value) },
        ].concat(props.isShowThumbnailList ? [{ title: '图片', icon: 'image', render: () => renderThumbnailList() }] : []))
        const currentDrauu = shallowRef<ReturnType<typeof useDrauu>>(useDrauu(document.createElement('svg')) as any)
        const currentDrauuOptopns = ref<any>({
            mode: 'draw',
            color: '#000',
            size: 3
        })
        const isDrauuTextMode = computed(() => currentDrauuOptopns.value.mode === 'text')
        const { isOpenDrauu } = useVModels(props, emit)
        const ZIndex = ref(1)
        watch(isOpenDrauu, (isOpenDrauu) => {
            ZIndex.value = isOpenDrauu ? 3 : 1
        }, { immediate: true })
        const handwritingModelOptions = ref([
            // {
            //     label: () => <span class="flex-center-start gap-15px">
            //         {svgIcon('text')}
            //         <span>文字</span>
            //     </span>,
            //     value: 'text',
            //     iconName: 'text',
            // },
            {
                label: () => <span class="flex-center-start gap-15px">
                    {svgIcon('draw')}
                    <span>绘制</span>
                </span>,
                value: 'draw',
                iconName: 'draw'
            },
            {
                label: () => <span class="flex-center-start gap-15px">
                    {svgIcon('handwriting')}
                    <span>手写笔</span>
                </span>,
                value: 'stylus',
                iconName: 'handwriting'
            },
            {
                label: () => <span class="flex-center-start gap-15px">
                    {svgIcon('line')}
                    <span>画线</span>
                </span>,
                value: 'line',
                iconName: 'line'
            },
            {
                label: () => <span class="flex-center-start gap-15px">
                    {svgIcon('rectangle')}
                    <span>矩形</span>
                </span>,
                value: 'rectangle',
                iconName: 'rectangle'
            },
            {
                label: () => <span class="flex-center-start gap-15px">
                    {svgIcon('ellipse')}
                    <span>椭圆</span>
                </span>,
                value: 'ellipse',
                iconName: 'ellipse'
            },
            {
                label: () => <span class="flex-center-start gap-15px">
                    {svgIcon('eraseLine')}
                    <span>橡皮擦</span>
                </span>,
                value: 'eraseLine',
                iconName: 'eraseLine'
            },
        ])
        const handwritingColorsLabelRender = (color: any) => {
            return <div style={{
                '--color': color
            }} class="w-25px h-25px b-rd-100% bg-$color b-1px b-solid b-#e8e8e8"></div>
        }
        const handwritingColorsOptions = ref([
            { label: '红色', value: '#f00' },
            { label: '白色', value: '#fff' },
            { label: '黑色', value: '#000' },
            { label: '黄色', value: '#ff0' },
            { label: '绿色', value: '#0f0' },
            { label: '蓝色', value: '#00f' },
            { label: '青色', value: '#0ff' },
        ].map(e => ({
            ...e, label: () => handwritingColorsLabelRender(e.value)
        })))
        const handwritingSizeLabelRender = (size: any) => {
            return <span>{size}</span>
        }
        const handwritingSizeOptions = ref(new Array(11).fill(0).map((e, k) => {
            const value = k === 0 ? 3 : k * 20
            return {
                label: () => handwritingSizeLabelRender(value),
                value
            }
        }))
        const handwritingModelIcon = computed(() => handwritingModelOptions.value.find(v => v.value === currentDrauuOptopns.value.mode)?.iconName || 'draw')
        type DrauuToolsType = {
            title: string
            icon: string
            action?(data: DrauuToolsType): void
            render?(data: DrauuToolsType): any
            options?: any
            nDropdownProps?: Record<string, any>
            className?: string
        }
        const drauuTools = computed<DrauuToolsType[]>(() => [
            {
                title: '清空', icon: 'clear', action() {
                    currentDrauu.value.clear()
                },
                className: 'text-red text-32px'
            },
            {
                title: '后退', icon: 'retreat', action() {
                    currentDrauu.value.undo()
                },
                className: !currentDrauu.value.canUndo.value ? 'opacity-30 text-32px' : 'text-32px'
            },
            {
                title: '前进', icon: 'forward', action() {
                    currentDrauu.value.redo()
                },
                className: !currentDrauu.value.canRedo.value ? 'opacity-30 text-32px' : 'text-32px'
            },
            {
                title: '大小', icon: 'size',
                options: handwritingSizeOptions.value,
                render() {
                    return handwritingSizeLabelRender(currentDrauu.value.brush.value.size)
                },
                nDropdownProps: {
                    onSelect(e: any, option: any) {
                        currentDrauuOptopns.value.size = option.value
                    }
                },
                className: 'text-32px'
            },
            {
                title: '颜色', icon: 'color',
                options: handwritingColorsOptions.value,
                render() {
                    return handwritingColorsLabelRender(currentDrauu.value.brush.value.color)
                },
                nDropdownProps: {
                    onSelect(e: any, option: any) {
                        if (option?.action) {
                            option?.action?.()
                        } else {
                            currentDrauuOptopns.value.color = option.value
                        }
                    }
                },
                className: 'text-32px'
            },
            {
                title: '手写模式', icon: handwritingModelIcon.value,
                options: handwritingModelOptions.value,
                nDropdownProps: {
                    onSelect(e: any, option: any) {
                        if (option?.action) {
                            option?.action?.()
                        } else {
                            currentDrauuOptopns.value.mode = option.value
                        }
                    }
                },
                className: 'text-20px'
            },
            {
                title: '是否开启手写面板', icon: 'eye', action: () => {
                    isOpenDrauu.value = !isOpenDrauu.value
                },
                className: 'text-25px'
            },
        ])

        const render = async (canvas: HTMLCanvasElement, pageIndex: number) => {
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            const page = await pdf.value.getPage(pageIndex + 1)
            const viewport = page.getViewport({ scale: 5 })
            canvas.height = viewport.height
            canvas.width = viewport.width
            await page.render({
                viewport,
                canvasContext: ctx
            }).promise
            const src = canvas.toDataURL()
            canvas.remove()
            let id = 1
            return {
                page,
                src,
                viewport,
                getTextRect(item: any) {
                    const [a, b, c, d, e, f] = item.transform;
                    const x = e; // X 位置
                    const y = f + d - c; // PDF 坐标系转换
                    const scale = viewport.scale
                    return {
                        item,
                        text: item.str,
                        x: x * scale,
                        y: viewport.height - y * scale,
                        // 所有文字的总宽度
                        width: item.width * scale,
                        // 所有文字的总高度
                        height: item.height * scale,
                        // 单个宽度
                        textWidth: a * scale,
                        // 单个高度
                        textHeight: a * scale,
                        id: id++,
                    }
                }
            }
        }
        /**
         * 判断是否是空闲时间
         * @param callback  执行的任务
         * @param isStop    是否停止监听空闲时间
         */
        const idleTaskExecute = async (callback: () => Promise<void>, isStop?: () => boolean) => {
            // 定义一个空闲回调函数
            async function idleTask(deadline: any) {
                // 如果还有剩余时间，继续执行任务
                while (deadline.timeRemaining() > 0) {
                    // 模拟任务逻辑
                    await callback()
                }
                if (isStop?.()) {
                    return
                }
                // 如果有更多任务需要执行，可以再次请求空闲回调
                requestIdleCallback(idleTask);
            }

            // 请求空闲回调
            requestIdleCallback(idleTask);
        }
        const swiper = ref<Swiper>()
        const thumbnailLists = ref([]) as Ref<any[]>
        const getThumbnailLists = async () => {
            let index = 0
            await idleTaskExecute(async () => {
                if (index >= numPages.value) {
                    return
                }
                const canvas = document.createElement('canvas')
                thumbnailLists.value.push({
                    index,
                    url: await render(canvas, index).then(res => res.src)
                })
                index++
                await new Promise(r => requestAnimationFrame(r))
            }, () => index >= numPages.value)
        }
        onMounted(async () => {
            pdf.value = await getDocument(props.src).promise
            numPages.value = pdf.value.numPages
            outline.value = await pdf.value.getOutline() || []
            const swiperEl = document.querySelector('.swiper');
            swiper.value = new Swiper(swiperEl as any, merge({
                spaceBetween: 30,
                zoom: {
                    maxRatio: 5,
                    toggle: false
                },
                direction: props.vertical ? "vertical" : "horizontal",
                virtual: {
                    enabled: true,
                    slides: new Array(numPages.value).fill(0),
                    renderSlide(s: any, k: number) {
                        const div = document.createElement('div')
                        div.className = 'swiper-slide'
                        createApp(() => h(renderCanvas(s, k))).mount(div)
                        return div
                    },
                    cache: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: "fraction",
                    clickable: true,
                },
                speed: 0,
                allowTouchMove: false,
                on: {
                    slideChange() {
                        currentPage.value = swiper.value?.activeIndex as number
                    }
                }
            }, props.swiperOptopns as any))
            // 缩略图渲染
            // getThumbnailLists()
        })
        const textSelectState = useTextSelection()
        const textSelectStateRect = computed(() => textSelectState.rects.value[0])
        const { copy } = useClipboard()
        const copyText = async () => {
            await copy(textSelectState.text.value as any)
        }
        const getSelectionEls = () => {
            const selection = textSelectState.selection.value as any;
            if (!selection.rangeCount) return [];

            const range = selection.getRangeAt(0);
            let commonAncestor = range.commonAncestorContainer;

            if (commonAncestor.nodeType === Node.TEXT_NODE) {
                commonAncestor = commonAncestor.parentElement;
            }

            const selectedElements = [];
            const treeWalker = document.createTreeWalker(
                commonAncestor, // 遍历整个父级
                // NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, // 允许文本节点和元素
                NodeFilter.SHOW_TEXT, // 允许文本节点和元素
                (node) => (range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT)
            );

            while (treeWalker.nextNode()) {
                selectedElements.push(treeWalker.currentNode.parentElement);
            }
            return selectedElements as Array<HTMLSpanElement>
        }
        const getSelectTextItems = (els: Array<HTMLSpanElement>) => {
            return els.map(e => textItemsIdMap.value[e.getAttribute('data-id') as any]).filter(e => e)
        }
        const getSelectTextRect = (callback: (path: SVGPathElement, data: {
            d: string
            els: Array<HTMLSpanElement>
            elsItem: Array<TextItem & { id: any }>
            elsRect: Array<{
                sx: number,
                sy: number,
                ex: number,
                ey: number
            }>

        }) => void) => {
            const rect = textSelectStateRect.value.toJSON()
            const brush = { ...currentDrauu.value.brush.value }
            currentDrauu.value.brush.value.mode = 'draw'
            currentDrauu.value.brush.value.fill = 'rgba(252, 255, 47,0.3)'
            currentDrauu.value.brush.value.color = 'rgba(0,0,0,0)'
            currentDrauu.value.brush.value.size = 0
            const startEvent = new PointerEvent('pointerdown', {
                clientX: rect.left,
                clientY: rect.top,
                pressure: 1
            });
            const endEvent = new PointerEvent('pointerdown', {
                clientX: rect.left + rect.width,
                clientY: rect.top + rect.height,
                pressure: 1
            });
            const selectEls = getSelectionEls()
            const selectElsItem = getSelectTextItems(selectEls)
            const elsRect: Array<{
                sx: number,
                sy: number,
                ex: number,
                ey: number
            }> = Object.values(groupBy(selectElsItem, e => e.y)).map(e => {
                return {
                    sx: Math.min(...e.map(e => e.x)),
                    sy: Math.min(...e.map(e => e.y)),
                    ex: Math.max(...e.map(e => e.x + e.width)),
                    ey: Math.max(...e.map(e => e.y + e.height))
                }
            }) as Array<{
                sx: number,
                sy: number,
                ex: number,
                ey: number
            }>
            const d = elsRect.map(e => `M ${e.sx} ${e.sy} L ${e.ex} ${e.sy} L ${e.ex} ${e.ey} L ${e.sx} ${e.ey} Z`).join(' ')
            const rectModel = new MyRectModel(currentDrauu.value.drauuInstance.value as any, path => {
                callback(path, {
                    els: selectEls,
                    elsItem: selectElsItem as any,
                    elsRect,
                    d
                })
            })
            rectModel.drawRect(startEvent, endEvent)
            currentDrauu.value.brush.value = brush
        }
        const highlightText = () => {
            getSelectTextRect((path, { d }) => {
                path.setAttribute('fill', currentDrauu.value.brush.value.fill as any)
                path.setAttribute('d', d)
            })
        }
        const id = 'selectionchange-pdf-copy-btn'
        document.getElementById(id)?.remove()
        const copyBtn = document.createElement("button");
        copyBtn.id = id
        copyBtn.style.position = "absolute";
        copyBtn.style.display = "none"; // 默认隐藏
        copyBtn.style.zIndex = "1000";
        copyBtn.style.padding = "5px 10px";
        copyBtn.style.background = "black";
        copyBtn.style.color = "white";
        copyBtn.style.borderRadius = "5px";
        copyBtn.style.border = "none";
        copyBtn.style.cursor = "pointer";
        createApp(() => <div class='flex-center gap-15px'>
            <div onClick={copyText}>复制</div>
            <div onClick={highlightText}>高亮</div>
        </div>).mount(copyBtn)
        document.body.appendChild(copyBtn);
        function showCopyButton(selection: any) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect(); // 获取选中文字的位置
            copyBtn.style.left = `${rect.left + window.scrollX}px`;
            copyBtn.style.top = `${rect.top + window.scrollY - 30}px`;
            copyBtn.style.display = "block";

            copyBtn.onclick = () => {
                hideCopyButton();
            };
        }
        function hideCopyButton() {
            copyBtn.style.display = "none";
        }
        document.addEventListener('selectionchange', (event) => {
            event.preventDefault(); // 阻止默认选择行为
            event.stopPropagation(); // 阻止事件冒泡
            const selection = window.getSelection();
            const selectedText = selection?.toString().trim();
            if (selectedText && selection?.anchorNode?.parentElement?.closest(".pdf-text-layer")) {
                // 显示
                showCopyButton(selection)
            } else {
                // 关闭
                hideCopyButton();
            }
        })
        document.addEventListener("contextmenu", (event) => {
            event.preventDefault(); // 禁止右键菜单
        });
        const renderCanvas = (_: any, k: number) => {
            return defineComponent(() => {
                const viewport = shallowRef<any>({
                    width: 0,
                    height: 0,
                    scale: 1
                })
                const elBox = ref<HTMLDivElement>() as Ref<HTMLDivElement>
                const src = ref<any>(null)
                const { width: boxw, height: boxh } = useElementSize(container)
                const { width: cw, height: ch } = useElementSize(elBox)
                const scale = computed(() => {
                    const w = boxw.value / cw.value
                    const h = boxh.value / ch.value
                    return Math.min(w, h)
                })
                const svgDrauu = ref()
                const drauu = useDrauu(svgDrauu)
                const syncConfig = () => {
                    drauu.brush.value = {
                        ...drauu.brush.value,
                        ...omit(currentDrauuOptopns.value, isDrauuTextMode.value ? ['mode'] : [])
                    }
                }
                const createText = ({ x, y }: { x: number, y: number }) => {
                    // 文字模式
                    const _appendNode = drauu.drauuInstance.value?._appendNode;
                    (drauu.drauuInstance.value as any)['_appendNode'] = async function (node: any) {
                        if (node === true) {
                            const el: any = document.createElementNS('http://www.w3.org/2000/svg', 'text')
                            el.setAttribute('x', x)
                            el.setAttribute('y', y)
                            el.setAttribute('fill', '#f00')
                            el.setAttribute('font-size', '100')
                            el.innerHTML = "测试文字"
                            el.getTotalLength = () => (x + 100 * 4) * viewport.value.scale
                            el.getPointAtLength = (n: number) => {
                                return {
                                    x: n * (x + 100 * 4) * viewport.value.scale,
                                    y: n * (y + 100) * viewport.value.scale,
                                }
                            }
                            _appendNode?.call(this, el as any)
                            this.commit({
                                undo: () => this._removeNode(el),
                                redo: () => this._restoreNode(el),
                            })
                            this.drawing = false
                            this._emitter.emit('end')
                            this._emitter.emit('changed')
                            this._originalPointerId = null
                        } else {
                            _appendNode?.call(this, node)
                        }
                    }
                    drauu.drauuInstance.value?._appendNode(true as any)
                }
                const textClick = (e: any) => {
                    createText((drauu.drauuInstance.value)?.model.getMousePosition(e) || { x: 0, y: 0 })
                }
                let off = () => { }
                const init = async () => {
                    syncConfig()
                    // 清除之前的事件
                    off()
                    // 回显数据
                    drauu.load(annotations.value[k] || '')
                    off = drauu.onChanged(() => {
                        // 储存数据
                        annotations.value[k] = drauu.dump()
                    }).off
                    emit('change')

                }
                watch(currentDrauuOptopns, syncConfig, { immediate: true, deep: true })

                useCssVars(() => ({
                    scale: scale.value,
                    width: viewport.value.wdith + 'px',
                    height: viewport.value.height + 'px',
                }) as any)

                onMounted(async () => {
                    const { viewport: _viewport, src: _src, page, getTextRect } = await render(document.createElement('canvas'), k)
                    viewport.value = _viewport
                    src.value = _src
                    watch(currentPage, async () => {
                        if (k === currentPage.value) {
                            currentDrauu.value = drauu
                            init()
                            textItems.value = (await page.getTextContent()).items.map((item: any) => getTextRect(item))
                            textItemsIdMap.value = {}
                        }
                    }, { immediate: true })
                })
                const renderTextItem = (item: TextItem, getId: () => number) => {
                    const total = item.text.length
                    return new Array(total).fill(0).map((e, k) => {
                        const text = item.text.slice(k, k + 1)
                        const x = item.x + k * item.textWidth
                        const y = item.y
                        const width = item.textWidth
                        const height = item.textHeight
                        const id = getId()
                        textItemsIdMap.value[id] = {
                            text,
                            x,
                            y,
                            width,
                            height,
                            id,
                        }
                        return <div key={k} class="pdf-text-layer text-100px abs text-transparent of-hidden selection:text-transparent selection:bg-#0095ff selection:bg-op-30" style={{
                            left: `${x}px`,
                            top: `${y}px`,
                            width: `${width}px`,
                            height: `${height}px`,
                            fontSize: `${height}px`,
                        }} data-id={id} data-text={text}>{text}</div>
                    })
                }
                const renderTextItems = () => {
                    let id = 0
                    const getId = () => {
                        return id++
                    }
                    return <div class="abs-content z-2">
                        {textItems.value.map((item) => renderTextItem(item, getId))}
                    </div>
                }
                const img = ref<HTMLImageElement>() as Ref<HTMLImageElement>
                const imgStyle = ref('')
                useMutationObserver(img, () => {
                    imgStyle.value = img.value.getAttribute('style') as string
                }, {
                    attributes: true,
                    attributeFilter: ['style']
                })
                return () => <div class="swiper-slide flex-center">
                    <div class="swiper-zoom-container  flex-center">
                        <div class="abs-r transform-scale-$scale w-$width h-$height" ref={elBox} >
                            <img class='img' ref={img} alt="" src={src.value} />
                            <div class="abs-content" style={imgStyle.value}>
                                <svg style={{
                                    '--ZIndex': ZIndex.value
                                }} class="abs-content z-$ZIndex" ref={svgDrauu}></svg>
                                {renderTextItems()}
                            </div>
                            {/* {isDrauuTextMode.value ? <div class={'abs-content'} onClick={textClick}></div> : null} */}
                        </div>
                    </div>
                </div>
            })
        }
        const outlineMoreClick = (item: any) => {
            item.show = !item.show
        }
        async function resolvePageIndex(dest: any, pdf: any) {
            if (!dest) {
                return null; // 没有目标位置
            }

            // 如果 dest 是数组，提取第一个元素作为目标
            const destination = Array.isArray(dest) ? dest[0] : dest;

            // 使用 pdf.pdfIndexToPageNumber 方法解析目标页码
            const pageIndex = await pdf.getPageIndex(destination);

            return pageIndex;
        }
        const outlineClick = async (item: any) => {
            try {
                if (item.dest) {
                    // 解析目标页码
                    const pageNumber = await resolvePageIndex(item.dest, pdf.value);
                    if (pageNumber !== undefined) {
                        // 使用 Swiper 切换到指定页面
                        swiper.value?.slideTo(pageNumber);
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
        const renderOutlineList = (outline: any[], level = 0) => {
            return (<>
                {outline.map((item) => {
                    return (<div>
                        <div style={{
                            '--levelGap': `${level * (level === 1 ? 10 : 30)}px`
                        }} class='flex-center-start hover:bg-#f0f0f0 cursor-pointer p-10px  p-l-$levelGap'>
                            {item.items && item.items.length > 0 ? (
                                <div onClick={() => outlineMoreClick(item)} class={`w-30px h-30px b-rd-100% flex-center hover:bg-#fff ${item.show ? 'transform rotate-180' : 'transform rotate-90'}`}>
                                    {svgIcon('arrow')}
                                </div>
                            ) : null}
                            <div class={'flex-1 of-hidden'} onClick={() => outlineClick(item)}>
                                <NEllipsis>
                                    {item.title}
                                </NEllipsis>
                            </div>
                        </div>
                        {item.show ? <div >
                            {item.items && item.items.length > 0 && renderOutlineList(item.items, level + 1)}
                        </div> : null}
                    </div>)
                })}
            </>)
        }
        const clickThumbnail = (index: number) => {
            swiper.value?.slideTo(index)
        }
        const renderThumbnailListItem = () => {
            return thumbnailLists.value.map((item) => {
                return <div class="w-100% flex-center flex-col select-none cursor-pointer">
                    <img onClick={() => clickThumbnail(item.index)} class={`w-80% b-solid b-3px b-#0000 ${currentPage.value === item.index ? ` !b-blue` : null}`} src={item.url} alt="" />
                    <div>{item.index + 1}</div>
                </div>
            })
        }
        const renderThumbnailList = () => {
            return (<>
                <div class=".thumbnail-list flex flex-col gap-10px bg-#e8e8e8 p-y-10px">{renderThumbnailListItem()}</div>
            </>)
        }
        const updatePage = (page: number) => {
            if (page > 0) {
                swiper.value?.slideNext()
            } else {
                swiper.value?.slidePrev()
            }
        }
        const outlineTabsActive = ref('outline')
        const outlineTabsActiveRender = computed<any>(() => outlineTabs.value.find((item) => item.icon === outlineTabsActive.value)?.render || (() => { }))
        const renderOutline = () => {
            return (<>
                <div class={`flex of-auto select-none cursor-pointer b-1px b b-#e8e8e8 b-r-solid outline-panel ${props.fixedOutline ? 'abs-start h-100% z-2 bg-#fff' : null}`}>
                    <div class={'text-16px flex flex-col b-1px b b-#e8e8e8 b-r-solid'}>
                        {outlineTabs.value.map((item) => (<div
                            onClick={() => outlineTabsActive.value = item.icon}
                            class={`w-50px h-50px flex-center hover:bg-#e8e8e8 cursor-pointer abs-r ${outlineTabsActive.value === item.icon ? 'text-#82a7f4' : ''}`}>
                            {outlineTabsActive.value === item.icon ? <div class="abs-content !w-5px bg-#82a7f4"></div> : null}
                            {svgIcon(item.icon)}
                        </div>))}
                    </div>
                    <div class={'of-auto w-200px'}>
                        {outlineTabsActiveRender.value?.()}
                    </div>
                </div>
            </>)
        }

        const renderDrauuToolsItem = () => {
            const classMap: Record<string, ComputedRef<string>> = {
                'eye': computed(() => isOpenDrauu.value ? 'text-#007bff !hover:text-#007bff' : '')
            }
            return drauuTools.value.map((item, k) => {
                return <div onClick={() => item.action?.(item)}
                    class={`w-30px h-30px p-x-10px flex-center cursor-pointer of-hidden hover:text-#82a7f4 b-1px b-#e8e8e8 b-r-dashed ${classMap?.[item.icon]?.value} ${k === 0 ? ' b-l-solid ' : ''} ${item.className || ''}`}
                >
                    {item.options ? <NDropdown
                        trigger="click"
                        placement='top'
                        options={item.options}
                        {...item.nDropdownProps}
                    >
                        <span>{item.render?.(item) || svgIcon(item.icon)}</span>
                    </NDropdown> : (item.render?.(item) || svgIcon(item.icon))}
                </div>
            })
        }
        const renderDrauuTools = () => {
            return <div class="flex-center p-x-15px">
                {renderDrauuToolsItem()}
            </div>
        }
        expose({
            outline,
            numPages,
            currentPage,
            annotations,
            currentDrauu,
            currentDrauuOptopns,
            container,
            showOutline,
            isOpenDrauu,
            pdf,
            swiper,
            thumbnailLists,
            getThumbnailLists,
            prevPage() {
                updatePage(-1)
            },
            nextPage() {
                updatePage(1)
            }
        })
        return () => (<>
            <div class={'abs-content flex flex-col of-hidden'}>
                <div class={'flex-1 abs-r flex of-hidden'}>
                    {showOutline.value ? renderOutline() : null}
                    <div class={'flex-1 abs-r'}>
                        <div ref={container} class='abs-content bg-#e8e8e8'>
                            <div class="swiper abs-content">
                                <div class="swiper-wrapper"></div>
                            </div>
                        </div >
                    </div>
                </div>
                {props.showTools ? slots.tool?.() || (
                    <div class="flex-center select-none tool-panel">
                        <div class='w-40px h-40px flex-center hover:bg-#e8e8e8 cursor-pointer hover:text-#82a7f4 text-18px' onClick={() => showOutline.value = !showOutline.value}>{svgIcon('menu')}</div>
                        <div class="flex-center flex-1 gap-10px">
                            <div class="p-x-10px flex-center hover:bg-#e8e8e8 cursor-pointer" onClick={() => updatePage(-1)}>上一页</div>
                            <div class={'abs-r w-100px'}>
                                <div class="swiper-pagination !top-50% !tr-y--50% !bottom-auto"></div>
                            </div>
                            <div class="p-x-10px flex-center hover:bg-#e8e8e8 cursor-pointer" onClick={() => updatePage(1)}>下一页</div>
                        </div>
                        {renderDrauuTools()}
                    </div>
                ) : null}

            </div>
        </>)
    }, {
        props: {
            src: String,
            vertical: {
                type: Boolean,
                default: false
            },
            fixedOutline: {
                type: Boolean,
                default: false
            },
            showTools: {
                type: Boolean,
                default: true
            },
            swiperOptopns: {
                type: Object,
                default: () => ({})
            },
            isOpenDrauu: {
                type: Boolean,
                default: false
            },
        } as any,
        inheritAttrs: false
    })
export { GlobalWorkerOptions } 
