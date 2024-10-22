import { useRecoilValue, useSetRecoilState } from 'recoil';
import { balanceAtom } from '../atoms/balance';

export const useGetBalance = () => {
    const value = useRecoilValue(balanceAtom);
    return value
}

export const useSetBalance = (balance : number) => {
    const set = useSetRecoilState(balanceAtom);
    set(balance)
}