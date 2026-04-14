export function storeUser(user)
{
    localStorage.setItem("userTokenExp", user["exp"]);
    localStorage.setItem("userToken", user["token"]);
    localStorage.setItem("userLevel", user["level"]);
    localStorage.setItem("userFirstname", user["firstname"]);
    localStorage.setItem("userLastname", user["lastname"]);
    localStorage.setItem("userUsername", user["username"]);
    localStorage.setItem("userId", user["id"]);
    
}
export function readUser()
{
    //console.log("readUser() called.");
    var user = {
        token:localStorage.getItem("userToken"),
        level:localStorage.getItem("userLevel"),
        id:localStorage.getItem("userId"),
        firstname:localStorage.getItem("userFirstname"),
        lastname:localStorage.getItem("userLastname"),
        username:localStorage.getItem("userUsername")
    };
    //console.log("username:" + user["username"]);
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

export function updateField(field, value)
{
    //console.log("updatedField triggered.")
    //console.log("Field: " + field);
    const capiField = field.charAt(0).toUpperCase() + field.slice(1);
    field = "user" + capiField;

    localStorage.setItem(field, value);
    //console.log(`changed item: ${localStorage.getItem(field)}`);
}