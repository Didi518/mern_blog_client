import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getAllPosts } from "../../services/index/posts";
import { getAllCategories } from "../../services/index/postCategories";
import { filterCategories } from "../../utils/multiSelectTagsUtils";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import ArticleCard from "../../components/ArticleCard";
import MainLayout from "../../components/MainLayout";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import AsyncMultiSelectTagsDropdown from "../../components/SelectAsyncPaginate";

let isFirstRun = true;

const promiseOptions = async (search, loadedOptions, { page }) => {
  const { data: categoriesData, headers } = await getAllCategories(
    search,
    page
  );

  return {
    options: filterCategories(search, categoriesData),
    hasMore:
      parseInt(headers["x-totalpagecount"]) !==
      parseInt(headers["x-currentpage"]),
    additional: {
      page: page + 1,
    },
  };
};

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);

  const searchParamsValue = Object.fromEntries([...searchParams]);

  const currentPage = parseInt(searchParamsValue?.page) || 1;
  const searchKeyword = searchParamsValue?.recherche || "";

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage, 12, categories),
    queryKey: ["posts", categories],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [currentPage, refetch, searchKeyword]);

  const handlePageChange = (page) => {
    setSearchParams({ page, recherche: searchKeyword });
  };

  const handleSearch = ({ searchKeyword }) => {
    setSearchParams({ page: 1, recherche: searchKeyword });
  };

  return (
    <MainLayout>
      <section className="flex flex-col container mx-auto px-5 py-10">
        <div className="flex flex-col mb-10 space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:gap-x-4">
          <Search className="w-full max-w-xl" onSearchKeyword={handleSearch} />
          <AsyncMultiSelectTagsDropdown
            placeholder="Recherche par catégories..."
            loadOptions={promiseOptions}
            onChange={(selectedValues) => {
              setCategories(selectedValues.map((item) => item.value));
            }}
          />
        </div>
        <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {isLoading || isFetching ? (
            [...Array(3)].map((_item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Echec lors de la récupération des données des posts" />
          ) : data?.data.length === 0 ? (
            <p className="text-orange-500">Acuun article trouvé!</p>
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
