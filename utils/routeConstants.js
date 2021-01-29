const routes = {
    adminAuth:{    
        register: "/register",
        login : "/login",
        addRestaurant : "/addRestaurant",
        verifyRestaurant : "/verifyRestaurant/:id"
    },
    userAuth:{
        register: "/resgisterUser",
        login : "/loginUser"
    }
};

module.exports = routes;