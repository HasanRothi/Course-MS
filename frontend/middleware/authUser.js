export default function({
    store,
    redirect,
    context
}) {
    // If the user is not authenticated
    var  x = store.getters["login/getLoggedIn"];
    console.log("inside auth middlewar - " + x.userRole)
    if (!x.userRole) {
        console.log("UnAuthenticated")
        return redirect('/login')
    }
}