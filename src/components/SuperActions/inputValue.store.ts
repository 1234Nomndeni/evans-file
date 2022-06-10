import createLocalStore from 'react-local-storage-manager'

const cache = createLocalStore(
    "inputValue", value => String(value),
    ""
)

export const useInputValue = () => {
    return [cache.use(), cache.set] as const
}

export const deleteVal = () =>{
    return [cache.use(), cache.remove] as const
}