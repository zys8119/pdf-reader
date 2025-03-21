import 'core-js';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from "pdfjs-dist"
import Swiper from "swiper"
import { register } from 'swiper/element/bundle';
import { createApp } from 'vue';
import { NEllipsis, NDropdown } from 'naive-ui';
import { useDrauu } from '@vueuse/integrations/useDrauu'
const svgMap: any = {
    arrow: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2642" width="200" height="200"><path d="M768 682.666667c-12.8 0-21.333333-4.266667-29.866667-12.8L512 443.733333l-226.133333 226.133334c-17.066667 17.066667-42.666667 17.066667-59.733334 0s-17.066667-42.666667 0-59.733334l256-256c17.066667-17.066667 42.666667-17.066667 59.733334 0l256 256c17.066667 17.066667 17.066667 42.666667 0 59.733334-8.533333 8.533333-17.066667 12.8-29.866667 12.8z"></path></svg>,
    outline: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7722" width="200" height="200"><path d="M996.562475 131.235956V848.476632a322.978348 322.978348 0 0 1-1.356084 57.134648 151.651166 151.651166 0 0 1-27.659003 64.401212 138.857918 138.857918 0 0 1-80.3416 50.09836 236.700681 236.700681 0 0 1-52.401145 2.712169H189.999339a246.832934 246.832934 0 0 1-48.358479-1.893401 137.757698 137.757698 0 0 1-81.416232-46.874462 151.369715 151.369715 0 0 1-30.08972-63.60803 329.067934 329.067934 0 0 1-2.149266-63.32658v-675.483513a293.553877 293.553877 0 0 1 3.479763-65.194394A137.348314 137.348314 0 0 1 118.254802 8.625464 221.655821 221.655821 0 0 1 194.835187 0.540131h516.054052c19.343392 0 141.03277 0.179105 160.376162 0.255865a154.695959 154.695959 0 0 1 53.475778 16.170666 143.437901 143.437901 0 0 1 63.966242 74.917262 154.823892 154.823892 0 0 1 6.447797 25.867948c0.51173 4.503223 0.9467 8.98086 1.407257 13.484084z m-76.580384 4.298532l-0.537317-5.654616-3.50535-13.484084a62.891609 62.891609 0 0 0-25.586497-30.447931 111.736231 111.736231 0 0 0-58.593077-8.622649H204.583642a227.412783 227.412783 0 0 0-54.550411 1.8934 61.407592 61.407592 0 0 0-42.703863 40.938395 170.841039 170.841039 0 0 0-2.686582 44.725196v686.255429a222.065205 222.065205 0 0 0 1.330498 46.900049 71.642191 71.642191 0 0 0 15.351898 28.835981c15.761282 19.548083 41.833922 19.113113 77.117701 19.113113h633.163448a183.352836 183.352836 0 0 0 42.447998-1.867814 62.149601 62.149601 0 0 0 33.59507-22.362598c14.09816-19.241046 12.358278-40.145213 12.358278-73.049448V135.534488zM828.408019 507.152766a35.821095 35.821095 0 0 1-28.477771 39.889349 141.083943 141.083943 0 0 1-28.145146 0.537316h-362.816524a36.15372 36.15372 0 0 1-5.910481-70.618731 121.97083 121.97083 0 0 1 29.833855-1.074633h341.323867a95.974949 95.974949 0 0 1 33.59507 2.968034 36.614277 36.614277 0 0 1 18.524624 19.676016z m-4.145013 231.992766a35.514057 35.514057 0 0 1-29.552403 37.995948l-48.358479 0.281451H458.32493c-42.192133 0-74.78933 5.756962-81.134781-31.522564a33.467138 33.467138 0 0 1 4.01708-20.750649c13.202632-25.816775 45.006648-19.420151 82.235001-19.420151H734.991719a197.476582 197.476582 0 0 1 71.207221 4.60557 37.10042 37.10042 0 0 1 16.375358 20.187746z m10.464878-461.836266a36.691036 36.691036 0 0 1-17.475578 35.56523 162.423081 162.423081 0 0 1-67.164554 4.835848h-296.803362c-40.759289 0-69.979069 4.01708-76.043068-31.778429a33.467138 33.467138 0 0 1 4.01708-20.750648c12.255932-23.769855 38.021534-19.420151 72.81917-19.420151h309.59661a154.823892 154.823892 0 0 1 50.789196 3.249485 36.179306 36.179306 0 0 1 18.268759 19.676016zM230.937734 230.818601a51.172993 51.172993 0 1 1-51.172994 51.172994 51.172993 51.172993 0 0 1 51.172994-51.172994z m0 230.278471a51.172993 51.172993 0 1 1-51.172994 51.172993 51.172993 51.172993 0 0 1 51.172994-51.172993z m0 230.278471a51.172993 51.172993 0 1 1-51.172994 51.172993 51.172993 51.172993 0 0 1 51.172994-51.172993z" p-id="7723"></path></svg>,
    image: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8856" width="200" height="200"><path d="M158.2 158.5h707.6c20.3 0 36.6 16.3 36.6 36.6v288.7c-36.6-28.5-105.7-73.2-158.6-73.2-77.3 0-146.4 178.9-231.8 178.9-65.1-4.1-154.5-77.3-256.2-65.1-40.7 8.1-97.6 73.2-134.2 122V195.1c0-20.4 16.3-36.6 36.6-36.6zM329 451.3c-32.5 0-61-12.2-81.3-32.5s-32.5-52.9-32.5-81.3c0-28.5 12.2-61 32.5-81.3 20.3-20.3 48.8-32.5 81.3-32.5 28.5 0 56.9 12.2 81.3 32.5 20.3 20.3 32.5 52.9 32.5 81.3 0 28.5-12.2 61-32.5 81.3-24.4 20.3-52.8 32.5-81.3 32.5z m557.1-345.7H137.9c-40.7 0-73.2 32.5-73.2 73.2v666.9c0 40.7 32.5 73.2 73.2 73.2h748.3c40.7 0 73.2-32.5 73.2-73.2V178.8c-0.1-40.7-32.6-73.2-73.3-73.2z m0 0" p-id="8857"></path></svg>,
    menu: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3949" width="200" height="200"><path d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z" p-id="3950"></path></svg>,
    handwriting: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4806" width="200" height="200"><path d="M635.973818 120.157091L230.469818 526.801455c-44.706909 44.869818-175.197091 311.621818-175.197091 311.621818s-5.748364 24.250182 9.076364 38.050909c15.755636 14.638545 36.770909 6.516364 36.770909 6.516363s274.106182-138.821818 310.132364-174.94109l26.996363-27.066182 378.484364-379.578182-180.759273-181.248zM910.429091 71.517091l-45.195636-45.312C846.545455 7.447273 820.503273-0.465455 793.6 1.931636c-26.949818 2.397091-54.784 15.104-77.172364 37.538909l-26.973091 27.04291 180.759273 181.271272 26.996364-27.066182c44.753455-44.869818 50.664727-111.709091 13.195636-149.178181M961.629091 1022.603636c-8.285091 0-16.593455-2.699636-23.528727-8.285091-1.047273-0.837818-111.732364-88.157091-247.435637-94.72-89.227636-4.282182-165.329455 20.270545-245.922909 46.289455-51.176727 16.523636-104.098909 33.582545-160.046545 42.309818-132.002909 20.573091-229.236364-4.235636-233.309091-5.306182a37.701818 37.701818 0 0 1 18.897454-72.983272c0.861091 0.232727 87.156364 21.806545 202.868364 3.770181 50.082909-7.796364 97.931636-23.226182 148.573091-39.563636 83.432727-26.926545 169.704727-54.760727 272.523636-49.803636 160.721455 7.749818 285.696 106.984727 290.909091 111.197091 16.197818 13.032727 18.804364 36.770909 5.794909 53.015272a37.469091 37.469091 0 0 1-29.323636 14.103273" p-id="4807"></path></svg>,
    eye: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8440" width="200" height="200"><path d="M512 73.152c231.68 0 429.76 180.8 512 436.928-82.24 258.624-280.32 440.768-512 440.768-231.744 0-429.824-182.144-512-440.512 82.176-256.384 280.32-437.184 512-437.184z m0 109.696c-168.192 0-320.64 127.424-395.904 327.616C191.36 712.512 343.936 841.152 512 841.152c168.128 0 320.768-128.768 395.904-330.88C832.576 310.272 680 182.912 512 182.912z m0 108.544c24.704 0 48.384 4.992 70.272 13.952h-0.768c-51.392 0-93.056 46.272-93.056 103.232s41.6 103.168 93.056 103.168c51.328 0 92.992-46.208 92.992-103.168a112 112 0 0 0-4.672-32.384c26.88 37.76 42.88 85.376 42.88 137.28 0 122.56-89.856 221.952-200.768 221.952-110.784 0-200.704-99.392-200.704-221.952 0-122.688 89.92-222.08 200.704-222.08z" p-id="8441"></path></svg>,
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
    const currentDrauu = shallowRef<ReturnType<typeof useDrauu>>(useDrauu(document.createElement('svg')) as any)
    type DrauuToolsType = {
        title: string
        icon: string
        action(data: DrauuToolsType): void
        options?: any
    }
    const isOpenDrauu = ref(true)
    const drauuTools = ref<DrauuToolsType[]>([
        {
            title: '手写模式', icon: 'handwriting', action: () => {
                isOpenDrauu.value = isOpenDrauu.value ? false : true
            }
        },
        {
            title: '是否开启手写面板', icon: 'eye', action: () => {
                isOpenDrauu.value = isOpenDrauu.value ? false : true
            }
        },
    ])
    const aa = () => {
        console.log(currentDrauu.value.clear())
    }
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
        return {
            src,
            viewport
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
        return defineComponent(() => {
            const svgDrauu = ref()
            const drauu = useDrauu(svgDrauu)
            const elBox = ref<HTMLDivElement>() as Ref<HTMLDivElement>
            const src = ref<any>(null)
            const { width: boxw, height: boxh } = useElementSize(container)
            const { width: cw, height: ch } = useElementSize(elBox)
            const scale = computed(() => {
                const w = boxw.value / cw.value
                const h = boxh.value / ch.value
                return Math.min(w, h)
            })
            const viewport = shallowRef<any>({
                width: 0,
                height: 0,
            })
            useCssVars(() => ({
                scale: scale.value,
                width: viewport.value.wdith + 'px',
                height: viewport.value.height + 'px',
            }) as any)

            onMounted(async () => {
                const res = await render(document.createElement('canvas'), k)
                viewport.value = res.viewport
                src.value = res.src
                watch(currentPage, () => {
                    if (k === currentPage.value) {
                        currentDrauu.value = drauu
                    }
                }, { immediate: true })
            })

            return () => <div class="swiper-slide flex-center">
                <div class="swiper-zoom-container  flex-center">
                    <div class="abs-r transform-scale-$scale w-$width h-$height" ref={elBox} >
                        <img class='img' alt="" src={src.value} />
                        {isOpenDrauu.value ? <svg class="abs-content" ref={svgDrauu}></svg> : null}
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
                class={`w-30px h-30px p-x-10px flex-center cursor-pointer hover:text-#82a7f4 b-1px b-#e8e8e8 b-r-dashed ${classMap?.[item.icon]?.value} ${k === 0 ? ' b-l-solid ' : ''}`}
            >
                {item.options ? <NDropdown trigger="hover" options={item.options}>
                    {svgIcon(item.icon)}
                </NDropdown> : svgIcon(item.icon)}
            </div>
        })
    }
    const renderDrauuTools = () => {
        return <div class="flex-center p-x-15px">
            {renderDrauuToolsItem()}
        </div>
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
                {renderDrauuTools()}
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
