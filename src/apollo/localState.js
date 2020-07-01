export const defaults = {
  isLoggedIn: false
};

export const resolvers = {
  Mutation: {
    logIn: (_, { token }, { cache }) => {
      localStorage.setItem("token", token);
      cache.writeData({
        data: {
          isLoggedIn: true
        }
      });
      return null;
    },
    logOut: () => {
      localStorage.removeItem("token");
      window.location.reload();
      return null;
    },
    checkToken: (_, __, { cache }) => {
      if (localStorage.getItem("token")) {
        cache.writeData({
          data: {
            isLoggedIn: true
          }
        });
      }
      return null;
    }
  }
};
