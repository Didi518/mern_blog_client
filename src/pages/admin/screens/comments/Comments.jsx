import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import { useDataTable } from '../../../../hooks/useDataTable'
import {
  deleteComment,
  getAllComments,
  updateComment,
} from '../../../../services/index/comments'
import { images } from '../../../../constants'
import DataTable from '../../components/DataTable'

const Comments = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: commentsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () =>
      getAllComments(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: 'comments',
    deleteDataMessage: 'Le commentaire a bien été supprimé',
    mutateDeleteFn: ({ slug, token }) => {
      return deleteComment({
        commentId: slug,
        token,
      })
    },
  })

  const {
    mutate: mutateUpdateCommentCheck,
    isLoading: isLoadingUpdateCommentCheck,
  } = useMutation({
    mutationFn: ({ token, check, commentId }) => {
      return updateComment({ token, check, commentId })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['comments'])
      toast.success(
        data?.check
          ? 'Le commentaire a bien été approuvé'
          : 'Le commentaire a été rejeté'
      )
    },
    onError: (error) => {
      toast.error(error.message)
      console.error(error)
    },
  })

  return (
    <DataTable
      pageTitle="Gestion des Commentaires"
      dataListName="Commentaires"
      searchInputPlaceholder="Recherche de commentaire..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        'Auteur',
        'Commentaire',
        'Réponse à',
        'Créé le',
        'Actions',
      ]}
      isFetching={isFetching}
      isLoading={isLoading}
      data={commentsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={commentsData?.headers}
    >
      {commentsData?.data.map((comment) => (
        <tr key={comment._id}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    alt={comment?.user?.name}
                    src={
                      comment?.user?.avatar
                        ? comment?.user?.avatar
                        : images.userImage
                    }
                    className="mx-auto object-cover rounded-lg w-10  aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment?.user?.name}
                </p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            {comment?.replyOnUser !== null && (
              <p className="text-gray-900 whitespace-nowrap">
                En réponse à{' '}
                <Link
                  to={`/blog/${comment?.post?.slug}/#commentaire-${comment?._id}`}
                  className="text-blue-500"
                >
                  {comment?.replyOnUser?.name}
                </Link>
              </p>
            )}
            <p className="text-gray-900 whitespace-no-wrap">{comment?.desc}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-nowrap">
              <Link
                to={`/blog/${comment?.post?.slug}`}
                className="text-blue-500"
              >
                {comment?.post?.title}
              </Link>
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-nowrap">
              {new Date(comment?.createdAt).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              disabled={isLoadingUpdateCommentCheck}
              type="button"
              className={`${
                comment?.check
                  ? 'text-yellow-600 hover:text-yellow-900'
                  : 'text-green-600 hover:text-green-900'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
              onClick={() =>
                mutateUpdateCommentCheck({
                  token: userState.userInfo.token,
                  check: comment?.check ? false : true,
                  commentId: comment?._id,
                })
              }
            >
              {comment?.check ? 'Rejeter' : 'Valider'}
            </button>
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() =>
                deleteDataHandler({
                  slug: comment?._id,
                  token: userState.userInfo.token,
                })
              }
            >
              Effacer
            </button>
          </td>
          {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {post.categories.length > 0
                ? post.categories
                    .slice(0, 3)
                    .map(
                      (category, index) =>
                        `${category.title}${
                          post.categories.slice(0, 3).length === index + 1
                            ? ""
                            : ", "
                        }`
                    )
                : "Sans catégorie"}
            </p>
          </td> */}
          {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex gap-x-2">
              {post.tags.length > 0
                ? post.tags.map((tag, index) => (
                    <p key={index}>
                      {tag}
                      {post.tags.length - 1 !== index && ", "}
                    </p>
                  ))
                : "Aucun tag"}
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
            <Link
              to={`/admin/articles/gestion/modifier/${post?.slug}`}
              className="text-green-600 hover:text-green-900"
            >
              Editer
            </Link>
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() =>
                deleteDataHandler({
                  slug: post?.slug,
                  token: userState.userInfo.token,
                })
              }
            >
              Effacer
            </button>
          </td> */}
        </tr>
      ))}
    </DataTable>
  )
}

export default Comments
