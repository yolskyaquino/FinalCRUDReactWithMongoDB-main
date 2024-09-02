function ConfirmDelete(userID){
    const isConfirmDelete = confirm("Are you sure you want to delete this item?")
    if(isConfirmDelete){
        window.location.href=`/DeleteUser/${userID}`
    }
}