export default defineComponent<{
    a?: number
}>(() => {
    const aa = ref(1)
    const bb = () => {
        aa.value = aa.value + 1
    }
    return () => (<>
        <div class={'bg-#f00'} onClick={bb}>
            {aa.value}
        </div>
    </>)
}, {
    inheritAttrs: false
})
