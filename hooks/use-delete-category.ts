import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Category } from '@prisma/client';
import { DeleteCategory } from '@/app/(dashboard)/_actions/categories';
import { toast } from 'sonner';

export const useDeleteCategory = (categoryIdentifier: string) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: async (data: Category) => {
      toast.success(`Category deleted successfully 🎉`, {
        id: categoryIdentifier,
      });

      await queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
    onError: () => {
      toast.error('Something went wrong', {
        id: categoryIdentifier,
      });
    },
  });
  return { mutate, isPending };
};
