import { useRecoilValue } from 'recoil';
import { newemail } from '../States';

export const useUserEmail = () => {
    return useRecoilValue(newemail);
};