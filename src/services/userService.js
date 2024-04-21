
class UserService {

    async getUsers (page, results) {
        return await fetch(`https://randomuser.me/api/?page=${page}&results=${results}`);
    }

}

export default new UserService();