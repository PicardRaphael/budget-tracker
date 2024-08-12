import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { DeleteTransaction } from '@/app/(dashboard)/transactions/_actions/deleteTransaction';

export const useDeleteTransaction = (transactionId: string) => {
  const queryClient = useQueryClient();
  console.log('useDeleteTransaction', transactionId);
  const deleteMutation = useMutation({
    mutationFn: DeleteTransaction,
    onSuccess: async () => {
      toast.success('Transaction deleted successfully', {
        id: transactionId,
      });

      await queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });
    },
    onError: () => {
      toast.error('Something went wrong', {
        id: transactionId,
      });
    },
  });
  return deleteMutation;
};
