import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

let isFirstRun = true;

export const useDataTable = ({
  dataQueryFn,
  dataQueryKey,
  mutateDeleteFn,
  deleteDataMessage,
}) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryFn: dataQueryFn,
    queryKey: [dataQueryKey],
  });

  const { mutate: mutateDeletePost, isLoading: isLoadingDeleteData } =
    useMutation({
      mutationFn: mutateDeleteFn,
      onSuccess: (_data) => {
        queryClient.invalidateQueries([dataQueryKey]);
        toast.success(deleteDataMessage);
      },
      onError: (error) => {
        toast.error(error.message);
        console.error(error);
      },
    });

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);

  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const deleteDataHandler = ({ slug, token }) => {
    if (
      window.confirm("Êtes vous sur de vouloir supprimer cet enregistrement?")
    ) {
      mutateDeletePost({ slug, token });
    }
  };

  return {
    userState,
    currentPage,
    searchKeyword,
    data,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  };
};
