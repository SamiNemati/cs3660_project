export function storeUser(user){
    localStorage.setItem("userTokenExp", user["exp"]);
    localStorage.setItem("userToken", user["token"]);
    localStorage.setItem("userLevel", user["level"]);
    localStorage.setItem("userFirstname", user["firstname"]);
    localStorage.setItem("userLastname", user["lastname"]);
    localStorage.setItem("userUsername", user["username"]);
}
export function readUser()
{
    var user = {
        token:localStorage.getItem("userToken"),
        level:localStorage.getItem("userLevel"),
        firstname:localStorage.getItem("userFirstname"),
        lastname:localStorage.getItem("userLastname"),
        username:localStorage.getItem("userUsername")
    };
    if(user["token"]) 
    {
        if(userTimeLeft()) 
        {
            return user;
        }
        else
        {
            alert("Session timed out");
            clearUser();
        }
    }
    return null;
}
export function clearUser()
{
    localStorage.clear();
}

export function userTimeLeft()
{
    var now = Date.now()/1000;
    var exp = localStorage.getItem("userTokenExp");
    return(exp && exp > now)? exp - now: 0;
}

export function addAuthHeader(headers)
{
    var user = readUser();
    if(user && user.token)
    {
        if(!headers["headers"]) headers["headers"] = {};
        headers["headers"]["Authorization"] = `Bearer ${user.token}`;
    }
    return headers;
}