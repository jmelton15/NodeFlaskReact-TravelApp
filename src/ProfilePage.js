import EditProfileForm from "./EditProfileForm"

const ProfilePage = ({username}) => {

    return (
        <>
        <div className="container d-flex flex-column align-items-center">
            <h1>{username.toUpperCase()}</h1>
            <EditProfileForm />
        </div>
        </>
    )

}

export default ProfilePage;