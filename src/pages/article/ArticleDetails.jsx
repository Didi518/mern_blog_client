import { Link } from "react-router-dom";

import { images } from "../../constants";
import BreadCrumbs from "../../components/BreadCrumbs";
import CommentsContainer from "../../components/comments/CommentsContainer";
import MainLayout from "../../components/MainLayout";
import SocialShareButton from "../../components/SocialShareButton";
import SuggestedPosts from "./container/SuggestedPosts";

const breadCrumbsData = [
  {
    name: "Accueil",
    link: "/",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Titre de l'article",
    link: "/blog/1",
  },
];

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
  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <BreadCrumbs data={breadCrumbsData} />
          <img
            src={images.Post1Image}
            alt="titre"
            className="rounded-xl w-full"
          />
          <Link
            to="/blog?categorie=selectedCategory"
            className="text-primary text-sm font-roboto inline-block mt-4 md:text-base"
          >
            EDUCATION
          </Link>
          <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
            Aidons nos enfants pour une meilleure éducation
          </h1>
          <div className="mt-4 text-dark-soft">
            <p className="leading-7">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              dignissimos suscipit, necessitatibus vero incidunt quia neque.
              Perferendis quaerat facilis, hic dolorum deserunt quia, id eius
              ullam consequuntur ex atque incidunt nobis iste nam dolores.
              Molestiae perferendis vel quasi aspernatur possimus quos sapiente
              eaque nam quaerat! Laudantium, consequuntur neque nemo,
              distinctio, ullam saepe eius quasi sapiente sequi incidunt nobis
              consectetur modi.
            </p>
          </div>
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