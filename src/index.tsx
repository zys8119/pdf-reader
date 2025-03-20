import 'core-js';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from "pdfjs-dist"
import Swiper from "swiper"
import { register } from 'swiper/element/bundle';
import { createApp } from 'vue';
import { NEllipsis } from 'naive-ui';
import { useDrauu } from '@vueuse/integrations/useDrauu'
const svgMap: any = {
    arrow: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2642" width="200" height="200"><path d="M768 682.666667c-12.8 0-21.333333-4.266667-29.866667-12.8L512 443.733333l-226.133333 226.133334c-17.066667 17.066667-42.666667 17.066667-59.733334 0s-17.066667-42.666667 0-59.733334l256-256c17.066667-17.066667 42.666667-17.066667 59.733334 0l256 256c17.066667 17.066667 17.066667 42.666667 0 59.733334-8.533333 8.533333-17.066667 12.8-29.866667 12.8z"></path></svg>,
    outline: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7722" width="200" height="200"><path d="M996.562475 131.235956V848.476632a322.978348 322.978348 0 0 1-1.356084 57.134648 151.651166 151.651166 0 0 1-27.659003 64.401212 138.857918 138.857918 0 0 1-80.3416 50.09836 236.700681 236.700681 0 0 1-52.401145 2.712169H189.999339a246.832934 246.832934 0 0 1-48.358479-1.893401 137.757698 137.757698 0 0 1-81.416232-46.874462 151.369715 151.369715 0 0 1-30.08972-63.60803 329.067934 329.067934 0 0 1-2.149266-63.32658v-675.483513a293.553877 293.553877 0 0 1 3.479763-65.194394A137.348314 137.348314 0 0 1 118.254802 8.625464 221.655821 221.655821 0 0 1 194.835187 0.540131h516.054052c19.343392 0 141.03277 0.179105 160.376162 0.255865a154.695959 154.695959 0 0 1 53.475778 16.170666 143.437901 143.437901 0 0 1 63.966242 74.917262 154.823892 154.823892 0 0 1 6.447797 25.867948c0.51173 4.503223 0.9467 8.98086 1.407257 13.484084z m-76.580384 4.298532l-0.537317-5.654616-3.50535-13.484084a62.891609 62.891609 0 0 0-25.586497-30.447931 111.736231 111.736231 0 0 0-58.593077-8.622649H204.583642a227.412783 227.412783 0 0 0-54.550411 1.8934 61.407592 61.407592 0 0 0-42.703863 40.938395 170.841039 170.841039 0 0 0-2.686582 44.725196v686.255429a222.065205 222.065205 0 0 0 1.330498 46.900049 71.642191 71.642191 0 0 0 15.351898 28.835981c15.761282 19.548083 41.833922 19.113113 77.117701 19.113113h633.163448a183.352836 183.352836 0 0 0 42.447998-1.867814 62.149601 62.149601 0 0 0 33.59507-22.362598c14.09816-19.241046 12.358278-40.145213 12.358278-73.049448V135.534488zM828.408019 507.152766a35.821095 35.821095 0 0 1-28.477771 39.889349 141.083943 141.083943 0 0 1-28.145146 0.537316h-362.816524a36.15372 36.15372 0 0 1-5.910481-70.618731 121.97083 121.97083 0 0 1 29.833855-1.074633h341.323867a95.974949 95.974949 0 0 1 33.59507 2.968034 36.614277 36.614277 0 0 1 18.524624 19.676016z m-4.145013 231.992766a35.514057 35.514057 0 0 1-29.552403 37.995948l-48.358479 0.281451H458.32493c-42.192133 0-74.78933 5.756962-81.134781-31.522564a33.467138 33.467138 0 0 1 4.01708-20.750649c13.202632-25.816775 45.006648-19.420151 82.235001-19.420151H734.991719a197.476582 197.476582 0 0 1 71.207221 4.60557 37.10042 37.10042 0 0 1 16.375358 20.187746z m10.464878-461.836266a36.691036 36.691036 0 0 1-17.475578 35.56523 162.423081 162.423081 0 0 1-67.164554 4.835848h-296.803362c-40.759289 0-69.979069 4.01708-76.043068-31.778429a33.467138 33.467138 0 0 1 4.01708-20.750648c12.255932-23.769855 38.021534-19.420151 72.81917-19.420151h309.59661a154.823892 154.823892 0 0 1 50.789196 3.249485 36.179306 36.179306 0 0 1 18.268759 19.676016zM230.937734 230.818601a51.172993 51.172993 0 1 1-51.172994 51.172994 51.172993 51.172993 0 0 1 51.172994-51.172994z m0 230.278471a51.172993 51.172993 0 1 1-51.172994 51.172993 51.172993 51.172993 0 0 1 51.172994-51.172993z m0 230.278471a51.172993 51.172993 0 1 1-51.172994 51.172993 51.172993 51.172993 0 0 1 51.172994-51.172993z" p-id="7723"></path></svg>,
    image: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8856" width="200" height="200"><path d="M158.2 158.5h707.6c20.3 0 36.6 16.3 36.6 36.6v288.7c-36.6-28.5-105.7-73.2-158.6-73.2-77.3 0-146.4 178.9-231.8 178.9-65.1-4.1-154.5-77.3-256.2-65.1-40.7 8.1-97.6 73.2-134.2 122V195.1c0-20.4 16.3-36.6 36.6-36.6zM329 451.3c-32.5 0-61-12.2-81.3-32.5s-32.5-52.9-32.5-81.3c0-28.5 12.2-61 32.5-81.3 20.3-20.3 48.8-32.5 81.3-32.5 28.5 0 56.9 12.2 81.3 32.5 20.3 20.3 32.5 52.9 32.5 81.3 0 28.5-12.2 61-32.5 81.3-24.4 20.3-52.8 32.5-81.3 32.5z m557.1-345.7H137.9c-40.7 0-73.2 32.5-73.2 73.2v666.9c0 40.7 32.5 73.2 73.2 73.2h748.3c40.7 0 73.2-32.5 73.2-73.2V178.8c-0.1-40.7-32.6-73.2-73.3-73.2z m0 0" p-id="8857"></path></svg>,
    menu: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3949" width="200" height="200"><path d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z" p-id="3950"></path></svg>,
}
const svgIcon = (name = 'arrow', fontSize = '14px') => {
    return <i style={{
        '--fontSize': fontSize,
        fill: "currentColor"
    }} class={'text-$fontSize w-1em h-1em flex-center'}>
        {svgMap[name]}
    </i>
}
export default defineComponent<{
    // pdf文件路径
    src: string,
    // 是否垂直模式
    vertical?: boolean
    // 是否固定大纲
    fixedOutline?: boolean
    // 是否开启swiper模式
    swiper?: boolean
}>((props) => {
    register()
    const pdf = shallowRef<PDFDocumentProxy>() as Ref<PDFDocumentProxy>
    const numPages = ref(0)
    const currentPage = ref(0)
    // 大纲
    const outline = ref<any[]>([])
    const container = ref<HTMLDivElement>() as Ref<HTMLDivElement>

    const showOutline = ref(false)
    const outlineTabs = shallowRef([
        { title: '大纲', icon: 'outline', render: () => renderOutlineList(outline.value) },
        { title: '图片', icon: 'image', render: () => renderThumbnailList() },
    ])
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
        await page.render({
            viewport,
            canvasContext: ctx
        }).promise
        const src = canvas.toDataURL()
        canvas.remove()
        return {
            scale,
            canvas,
            src
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
        swiper.value = new Swiper(swiperEl as any, {
            spaceBetween: 30,
            zoom: {
                maxRatio: 5,
                toggle: false
            },
            direction: props.vertical ? "vertical" : "horizontal",
            virtual: {
                enabled: true,
                slides: new Array(numPages.value).fill(0),
                renderSlide(s, k) {
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
        })
        // 缩略图渲染
        // getThumbnailLists()
    })
    const renderCanvas = (_: any, k: number) => {
        return <div class="swiper-slide flex-center">
            <div class="swiper-zoom-container  flex-center">
                <img ref={(el: any) => {
                    render(document.createElement('canvas'), k).then(res => {
                        el.src = res.src
                    })
                }} />
            </div>
        </div>
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
    const svgDrauu = ref() as Ref<SVGElement>
    const { undo, redo, canUndo, canRedo, brush, load, drauuInstance } = useDrauu(svgDrauu, {

    })
    const drauuClickTest = () => {
    }
    return () => (<>
        <div class={'abs-content flex flex-col of-hidden'}>
            <div class={'flex-1 abs-r flex of-hidden'}>
                {showOutline.value ? renderOutline() : null}
                <div class={'flex-1 abs-r'}>
                    <div ref={container} class='abs-content bg-#e8e8e8'>
                        <div class="swiper abs-content">
                            <div class="swiper-wrapper"></div>
                        </div>
                        <div class="abs-content z-1">
                            <svg class="abs-content" ref={svgDrauu}></svg>
                        </div>
                    </div >
                </div>
            </div>
            <div class="flex-center select-none tool-panel">
                <div class='w-40px h-40px flex-center hover:bg-#e8e8e8 cursor-pointer hover:text-#82a7f4 text-18px' onClick={() => showOutline.value = !showOutline.value}>{svgIcon('menu')}</div>
                <div class="flex-center flex-1 gap-10px">
                    <div class="p-x-10px flex-center hover:bg-#e8e8e8 cursor-pointer" onClick={() => updatePage(-1)}>上一页</div>
                    <div class={'abs-r w-100px'}>
                        <div class="swiper-pagination !top-50% !tr-y--50% !bottom-auto"></div>
                    </div>
                    <div class="p-x-10px flex-center hover:bg-#e8e8e8 cursor-pointer" onClick={() => updatePage(1)}>下一页</div>
                </div>
                <button onClick={drauuClickTest}>drauu</button>
            </div>
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
        swiper: {
            type: Boolean,
            default: true
        }
    },
    inheritAttrs: false
})
export { GlobalWorkerOptions } 
