import { useRecoilValue, useSetRecoilState } from 'recoil';
import { balanceAtom } from './atoms';

//balance hooks

export const useGetBalance = () => {
    const value : number = useRecoilValue(balanceAtom);
    return value
}

export const useSetBalance = (value: number) => {
    const setValue = useSetRecoilState(balanceAtom);
    setValue(value)
}