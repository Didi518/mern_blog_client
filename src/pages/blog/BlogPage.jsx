import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getAllPosts } from "../../services/index/posts";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import ArticleCard from "../../components/ArticleCard";
import MainLayout from "../../components/MainLayout";
import Pagination from "../../components/Pagination";

let isFirstRun = true;

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValue = Object.fromEntries([...searchParams]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParamsValue?.page) || 1
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getAllPosts("", currentPage, 12),
    queryKey: ["posts", currentPage],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    window.scrollTo(0, 0);
    refetch();
  }, [currentPage, refetch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ page });
  };

  return (
    <MainLayout>
      <section className="flex flex-col container mx-auto px-5 py-10">
        <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {isLoading ? (
            [...Array(3)].map((_item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Echec lors de la récupération des données des posts" />
          ) : (
            data?.data.map((post) => (
              <ArticleCard
                key={post._id}
                post={post}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          )}
        </div>
        {!isLoading && (
          <Pagination
            onPageChange={(page) => handlePageChange(page)}
            currentPage={currentPage}
            totalPageCount={
              data?.headers?.["x-totalpagecount"]
                ? JSON.parse(data?.headers["x-totalpagecount"])
                : 0
            }
          />
        )}
      </section>
    </MainLayout>
  );
};

export default BlogPage;
