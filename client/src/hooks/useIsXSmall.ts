import useMediaQuery from 'use-media-antd-query';

export const useIsXSmall = () => {
    const colSize = useMediaQuery();
    if (colSize === 'xs' || colSize === 'sm'){
        return false
    }else
    return colSize === 'xl' || colSize === 'xxl' || colSize === 'md' || colSize === 'lg';
}
export const useIsXSmallCol = () => {
    const colSize = useMediaQuery();
    if (colSize === 'xs' || colSize === 'sm'){
        return true
    }else
    return !(colSize === 'xl' || colSize === 'xxl' || colSize === 'md' || colSize === 'lg');
}
