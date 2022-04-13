export const initialState = () => ({
  sortCriteria: "status",
  isModalVisible: {
    isVisible: false,
    type: "login",
    id: 0,
    text: "",
  },
  tasks: [
    {
      username: "",
      email: "",
      text: "",
    },
  ],
  totalNumber: 0,
  currentPage: 1,
  error: {},
  sortDirection: "asc",
  isAdmin: localStorage.getItem("isAdmin") === "true" || false,
  token: localStorage.getItem("token") || "",
});
