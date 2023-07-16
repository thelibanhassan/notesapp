
//DELETE Note
const deleteNote = async id => {
    let token = JSON.parse(localStorage.getItem('token'))
    try {

        const res = await fetch(`http://localhost:3001/api/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },


        })
        if (res.status === 200) console.log('deleted')
    }
    catch (err) {
        console.log(err)
    }

}



export { deleteNote }

