import useMediaQuery from 'use-media-antd-query';

export const useIsXSmall = () => {
    const colSize = useMediaQuery();
    if (colSize === 'lg' || colSize === 'xl'){
        return true
    }
    return false
}
export const useIsXSmallCol = () => {
    const colSize = useMediaQuery();
    if (colSize === 'xs' || colSize === 'sm' || colSize === 'md'){
        return true
    }
    if (colSize === 'lg'){
        return false
    }
}
