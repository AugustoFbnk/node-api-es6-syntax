
async function create(data) {

}

async function getById(id) {
    return {
        email: 'teste@ferbonink.com'
    }
}


async function authenticate(data) {
    const res = {
        _id: '3131sdfsdsdf',
        email: 'teste@ferbonink.com',
        name: 'Augusto',
        roles: ''
    }
    return res;
}
export default { create, getById, authenticate };