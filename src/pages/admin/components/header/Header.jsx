import { useEffect, useState } from "react";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useWindowSize } from "@uidotdev/usehooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createPost } from "../../../../services/index/posts";
import { images } from "../../../../constants";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const windowSize = useWindowSize();

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ token }) => {
        return createPost({
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("L'article a bien été créé");
        navigate(`/admin/articles/gestion/modifier/${data.slug}`);
      },
      onError: (error) => {
        toast.error(error.message);
        console.error(error);
      },
    });

  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  const handleCreateNewPost = ({ token }) => {
    mutateCreatePost({ token });
  };

  return (
    <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0 z-50">
      <Link to="/">
        <img src={images.Logo} alt="logo" className="w-16 lg:hidden" />
      </Link>
      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="w-6 h-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="w-6 h-6" onClick={toggleMenuHandler} />
        )}
      </div>
      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHandler}
          />
          <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6">
            <Link to="/">
              <img src={images.Logo} alt="logo" className="w-16" />
            </Link>
            <h4 className="mt-10 font-bold text-[#c7c7c7]">MENU PRINCIPAL</h4>
            <div className="mt-6 flex flex-col gap-y-[0.563rem]">
              <NavItem
                title="Administration"
                link="/admin"
                icon={<AiFillDashboard className="text-xl" />}
                name="dashboard"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItem
                title="Utilisateurs"
                link="/admin/utilisateurs/gestion"
                icon={<FaUser className="text-xl" />}
                name="users"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItem
                title="Commentaires"
                link="/admin/commentaires"
                icon={<FaComments className="text-xl" />}
                name="comments"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItemCollapse
                title="Articles"
                icon={<MdDashboard className="text-xl" />}
                name="posts"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                <button
                  disabled={isLoadingCreatePost}
                  className="text-start disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() =>
                    handleCreateNewPost({ token: userState.userInfo.token })
                  }
                >
                  Créer un Nouveau Post
                </button>
                <Link to="/admin/articles/gestion">Gestion des Articles</Link>
                <Link to="/admin/categories/gestion">Catégories</Link>
              </NavItemCollapse>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
