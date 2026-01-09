import UserRepository from "../repositories/UserRepository";

export default class UserService {
  constructor(private repository: UserRepository) {}

  async update(id: number, payload: FormData): Promise<any> {
    try {
      const data = (await this.repository.update(id, payload)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id: number) {
    try {
      const data = (await this.repository.delete(id)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getProfile() {
    try {
      const data = (await this.repository.getProfile()).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
