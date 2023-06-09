const addCourse = (id_mentor, data) => {
    return fetch(`http://localhost:3000/addCourse/${id_mentor}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',  'Accept': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json()
        })
        .then(res => {
            return res.message
        })
}

export {addCourse}