import axios from "axios";

class Api {
  constructor(config) {
    this._url = config.url;
  }

  async getTasks(page = 1, field = "id", direction = "asc") {
    try {
      const response = await axios.get(
        `${this._url}?developer=VladSmirnov&page=${page}&sort_field=${field}&sort_direction=${direction}`,
        {}
      );
      return response.data.message;
    } catch (error) {
      console.log(error);
    }
  }
  async createTask(task) {
    try {
      await axios({
        method: "POST",
        url: "https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=VladSmirnov",
        data: task,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async login(form) {
    try {
      const response = await axios({
        method: "POST",
        url: "https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=VladSmirnov",
        data: form,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async editTask(task, id) {
    try {
      await axios({
        method: "POST",
        url: `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=VladSmirnov`,

        data: task,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

const api = new Api({
  url: "https://uxcandy.com/~shapoval/test-task-backend/v2/",
});

export default api;
