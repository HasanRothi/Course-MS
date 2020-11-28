export default function({
    store,
    redirect,
    context
}) {
    // If the user is not authenticated
    console.log("inside auth middlewar - " + store.getters["login/getLoggedIn"])
    if (store.state["login/isLoggedIn"] == false) {
        console.log("lol")
        return redirect('/login')
    }
}