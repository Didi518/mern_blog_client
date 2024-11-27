import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

import { useDataTable } from '../../../../hooks/useDataTable'
import {
  deleteUser,
  getAllUsers,
  updateProfile,
} from '../../../../services/index/users'
import { images } from '../../../../constants'
import DataTable from '../../components/DataTable'

const Users = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: usersData,
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
      getAllUsers(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: 'users',
    deleteDataMessage: "L'utilisateur a bien été supprimé",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteUser({
        slug,
        token,
      })
    },
  })

  const { mutate: mutateUpdateUser, isLoading: isLoadingUpdateUser } =
    useMutation({
      mutationFn: ({ isAdmin, userId }) => {
        return updateProfile({
          token: userState.userInfo.token,
          userData: { admin: isAdmin },
          userId,
        })
      },
      onSuccess: (_data) => {
        queryClient.invalidateQueries(['users'])
        toast.success("L'utilisateur a bien été mis à jour")
      },
      onError: (error) => {
        toast.error(error.message)
        console.error(error)
      },
    })

  const handleAdminCheck = (event, userId) => {
    const initialCheckValue = !event.target.checked

    if (
      window.confirm(
        'Êtes-vous sur de vouloir changer le statut de cet utilisateur ?'
      )
    ) {
      mutateUpdateUser({ isAdmin: event.target.checked, userId })
    } else {
      event.target.checked = initialCheckValue
    }
  }

  return (
    <DataTable
      pageTitle="Gestion des Utilisateurs"
      dataListName="Utilisateurs"
      searchInputPlaceholder="Email de l'utilisateur"
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        'Nom',
        'Email',
        'Créé le',
        'Vérifié',
        'Admin',
        'Actions',
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={usersData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={usersData?.headers}
      userState={userState}
    >
      {usersData?.data.map((user) => (
        <tr key={user._id}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    alt={user?.name}
                    src={user?.avatar ? user?.avatar : images.userImage}
                    className="mx-auto object-cover rounded-lg w-10  aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">{user?.name}</p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-nowrap">
              {user?.verified ? '✅' : '❌'}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-nowrap">
              <input
                type="checkbox"
                className="d-checkbox disabled:bg-orange-400 disabled:opacity-100 checked:bg-[url('../public/images/check.png')] bg-cover checked:disabled:bg-none"
                defaultChecked={user.admin}
                onChange={(event) => handleAdminCheck(event, user._id)}
                disabled={isLoadingUpdateUser}
              />
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() =>
                deleteDataHandler({
                  slug: user?._id,
                  token: userState.userInfo.token,
                })
              }
            >
              Effacer
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  )
}

export default Users
