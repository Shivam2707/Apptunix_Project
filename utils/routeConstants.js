const routes = {
    adminAuth:{    
        register: "/register",
        login : "/login",
        addRestaurant : "/addRestaurant",
        verifyRestaurant : "/verifyRestaurant/:id",
        forgotPassword : "/forgotPassword",
        getProfile : "/getProfile",
        updateProfile : "/updateProfile"
    },
    userAuth:{
        login : "/loginUser",
        getProfile : "/getProfile"
    }
};

module.exports = routes;