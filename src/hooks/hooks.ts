import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiPost, apiPut } from "../service/api.service";


/////// API larni olish
export function useGet<T>(endpoint: string, queryKey?: string) {
    return useQuery<T>({
        queryKey: [queryKey || endpoint],
        queryFn: () => apiGet<T>(endpoint)
    });
}



/////// yangi api qoshish
export function usePost<T>(endpoint: string, queryKey: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newData: any) => apiPost<T>(endpoint, newData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        }
    });
}



///////// apilarni remove qilish
export function useDelete(endpoint: string, queryKey: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => apiDelete(endpoint, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
    });
}

///////// apilarni ozgartirish
export function usePut<T>(endpoint: string, queryKey: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, body }: { id: string, body: any }) => apiPut<T>(endpoint, id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        }
    });
}