

const getUsers = async () => {
	const request = new RequestModel(`${env.IDENTITY_API_URL}/admin/users`);
}

export default {
	getUsers
}
