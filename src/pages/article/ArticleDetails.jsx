import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useQuery } from "@tanstack/react-query";
import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

import { getSinglePost } from "../../services/index/posts";
import { images, stables } from "../../constants";
import BreadCrumbs from "../../components/BreadCrumbs";
import CommentsContainer from "../../components/comments/CommentsContainer";
import MainLayout from "../../components/MainLayout";
import SocialShareButton from "../../components/SocialShareButton";
import SuggestedPosts from "./container/SuggestedPosts";

const postsData = [
  {
    _id: "1",
    image: images.Post1Image,
    title: "Aidons nos enfants pour une meilleure éducation",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "2",
    image: images.Post1Image,
    title: "Aidons nos enfants pour une meilleure éducation",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "3",
    image: images.Post1Image,
    title: "Aidons nos enfants pour une meilleure éducation",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "4",
    image: images.Post1Image,
    title: "Aidons nos enfants pour une meilleure éducation",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
];

const tagsData = [
  "Médecine",
  "Mode de vie",
  "Apprentissage",
  "Santé",
  "Nourriture",
  "Diététique",
  "Education",
];

const ArticleDetails = () => {
  const { slug } = useParams();
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

  const { data } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
  });

  useEffect(() => {
    if (data) {
      setBreadCrumbsData([
        { name: "Accueil", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: data.title, link: `/blog/${data.slug}` },
      ]);
      setBody(
        parse(
          generateHTML(data?.body, [Bold, Document, Italic, Paragraph, Text])
        )
      );
    }
  }, [data]);

  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbsData} />
          <img
            src={
              data?.photo
                ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                : images.samplePostImage
            }
            alt={data?.title}
            className="rounded-xl w-full"
          />
          <div className="mt-4 flex gap-2">
            {data?.categories.map((category) => (
              <Link
                to={`/blog?categorie=${category.name}`}
                className="text-primary text-sm font-roboto inline-block md:text-base"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
            {data?.title}
          </h1>
          <div className="mt-4 prose prose-sm sm:prose-base">{body}</div>
          <CommentsContainer className="mt-10" logginedUserId="a" />
        </article>
        <div>
          <SuggestedPosts
            header="Derniers articles"
            posts={postsData}
            tags={tagsData}
            className="mt-8 lg:mt-0 lg:max-w-xs"
          />
          <div className="mt-7">
            <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
              Partagez sur:
            </h2>
            <SocialShareButton
              url={encodeURI("https://kevflix-mu.vercel.app/")}
              title={encodeURIComponent("Alice in Borderland 2020")}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ArticleDetails;
